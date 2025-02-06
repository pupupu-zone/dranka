use image::{ColorType, DynamicImage, ImageBuffer};
use wasm_bindgen::prelude::*;

use crate::color::film_utils::{apply_color_grading, apply_tone_curve};
use crate::color::types::{ColorGrading, ToneCurve};
use crate::utils;

const COLOR_MATRIX: [[f32; 3]; 3] = [
    [1.2, -0.1, -0.1], // Red channel
    [-0.1, 1.1, 0.0],  // Green channel
    [0.0, -0.1, 1.1],  // Blue channel
];

const TONE_CURVE: ToneCurve = ToneCurve {
    shadows: 1.1,
    highlights: 0.9,
    contrast: 1.2,
    black_point: 0.02,
    white_point: 0.98,
};

const COLOR_GRADING: ColorGrading = ColorGrading {
    saturation: 1.15,
    vibrance: 1.1,
    temperature: 1.02,
    tint: 0.99,
};

fn proceed_pixel(r: f32, g: f32, b: f32, strength: f32) -> (u8, u8, u8) {
    let rgb_matrix = [
        r + ((r * COLOR_MATRIX[0][0] + g * COLOR_MATRIX[0][1] + b * COLOR_MATRIX[0][2]) - r)
            * strength,
        g + ((r * COLOR_MATRIX[1][0] + g * COLOR_MATRIX[1][1] + b * COLOR_MATRIX[1][2]) - g)
            * strength,
        b + ((r * COLOR_MATRIX[2][0] + g * COLOR_MATRIX[2][1] + b * COLOR_MATRIX[2][2]) - b)
            * strength,
    ];

    let r = apply_tone_curve(rgb_matrix[0], strength, &TONE_CURVE);
    let g = apply_tone_curve(rgb_matrix[1], strength, &TONE_CURVE);
    let b = apply_tone_curve(rgb_matrix[2], strength, &TONE_CURVE);

    let (r, g, b) = apply_color_grading(r, g, b, strength, &COLOR_GRADING);

    ((r * 255.0) as u8, (g * 255.0) as u8, (b * 255.0) as u8)
}
#[wasm_bindgen]
pub fn neg_hi(init_base64: &str, strength: f32) -> String {
    if init_base64.is_empty() {
        return "".to_string();
    }

    utils::proceed_image(strength, init_base64, &apply_preset)
}

fn apply_preset(img: &DynamicImage, strength: f32) -> DynamicImage {
    let dynamic_image = match img.color() {
        ColorType::Rgb8 | ColorType::Rgb16 | ColorType::Rgb32F => {
            let rgb_img = img.to_rgb8();
            let (width, height) = rgb_img.dimensions();
            let mut output = ImageBuffer::new(width, height);

            for (x, y, pixel) in rgb_img.enumerate_pixels() {
                let r = (pixel[0] as f32) / 255.0;
                let g = (pixel[1] as f32) / 255.0;
                let b = (pixel[2] as f32) / 255.0;

                let (r, g, b) = proceed_pixel(r, g, b, strength);

                output.put_pixel(x, y, image::Rgb([r, g, b]));
            }

            DynamicImage::ImageRgb8(output)
        }
        _ => {
            let rgba_img = img.to_rgba8();
            let (width, height) = rgba_img.dimensions();
            let mut output = ImageBuffer::new(width, height);

            for (x, y, pixel) in rgba_img.enumerate_pixels() {
                let r = (pixel[0] as f32) / 255.0;
                let g = (pixel[1] as f32) / 255.0;
                let b = (pixel[2] as f32) / 255.0;
                let a = pixel[3] as u8;

                let (r, g, b) = proceed_pixel(r, g, b, strength);

                output.put_pixel(x, y, image::Rgba([r, g, b, a]));
            }

            DynamicImage::ImageRgba8(output)
        }
    };

    dynamic_image
}
