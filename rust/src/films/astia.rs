use image::{ColorType, DynamicImage, GenericImageView, ImageBuffer};
use wasm_bindgen::prelude::*;

use crate::color::film_utils::{add_dither, apply_color_grading, apply_curve};
use crate::color::types::{ColorGrading, Curves, ToneCurve};
use crate::utils;

const COLOR_MATRIX: [[f32; 3]; 3] = [
    [1.1, -0.05, -0.05], // R
    [-0.05, 1.05, 0.0],  // G
    [0.0, -0.05, 1.05],  // B
];

const TONE_CURVE: ToneCurve = ToneCurve {
    contrast: 1.1,
    black_point: 0.01,
    white_point: 0.99,
};

const CURVES: Curves = Curves {
    toe_strength: 0.3,
    toe_threshold: 0.15,

    shadow_strength: 1.05,
    shadow_threshold: 0.35,

    highlight_strength: 0.95,
    highlight_threshold: 0.65,

    shoulder_strength: 0.2,
    shoulder_threshold: 0.85,
};

const COLOR_GRADING: ColorGrading = ColorGrading {
    saturation: 1.1,
    vibrance: 1.05,
    temperature: 1.01,
    tint: 1.0,
};

#[wasm_bindgen]
pub fn astia(init_base64: &str, strength: f32) -> String {
    if init_base64.is_empty() {
        return "".to_string();
    }

    utils::proceed_image(strength, init_base64, &apply_preset)
}

/*
 * Generic part. Maybe I have to move it to utils?
 */
fn apply_preset(img: &DynamicImage, strength: f32) -> DynamicImage {
    let (width, height) = img.dimensions();

    let dynamic_image = match img.color() {
        ColorType::Rgb8 | ColorType::Rgb16 | ColorType::Rgb32F => {
            let rgb_img = img.to_rgb16();
            let mut output = ImageBuffer::new(width, height);

            for (x, y, pixel) in rgb_img.enumerate_pixels() {
                let r = (pixel[0] as f32) / 65535.0;
                let g = (pixel[1] as f32) / 65535.0;
                let b = (pixel[2] as f32) / 65535.0;

                let (r, g, b) = proceed_pixel(r, g, b, strength);

                output.put_pixel(x, y, image::Rgb([r, g, b]));
            }

            DynamicImage::ImageRgb16(output)
        }
        _ => {
            let rgba_img = img.to_rgba16();
            let mut output = ImageBuffer::new(width, height);

            for (x, y, pixel) in rgba_img.enumerate_pixels() {
                let r = (pixel[0] as f32) / 65535.0;
                let g = (pixel[1] as f32) / 65535.0;
                let b = (pixel[2] as f32) / 65535.0;
                let a = pixel[3] as u16;

                let (r, g, b) = proceed_pixel(r, g, b, strength);

                output.put_pixel(x, y, image::Rgba([r, g, b, a]));
            }

            DynamicImage::ImageRgba16(output)
        }
    };

    dynamic_image
}

/*
 * Proceed pixel
 */
fn proceed_pixel(r: f32, g: f32, b: f32, strength: f32) -> (u16, u16, u16) {
    let rgb_matrix = [
        r + ((r * COLOR_MATRIX[0][0] + g * COLOR_MATRIX[0][1] + b * COLOR_MATRIX[0][2]) - r)
            * strength,
        g + ((r * COLOR_MATRIX[1][0] + g * COLOR_MATRIX[1][1] + b * COLOR_MATRIX[1][2]) - g)
            * strength,
        b + ((r * COLOR_MATRIX[2][0] + g * COLOR_MATRIX[2][1] + b * COLOR_MATRIX[2][2]) - b)
            * strength,
    ];

    let r = apply_curve(rgb_matrix[0], strength, &CURVES, &TONE_CURVE);
    let g = apply_curve(rgb_matrix[1], strength, &CURVES, &TONE_CURVE);
    let b = apply_curve(rgb_matrix[2], strength, &CURVES, &TONE_CURVE);

    let (r, g, b) = apply_color_grading(r, g, b, strength, &COLOR_GRADING);

    let dither_strength = 1.0 / 65535.0; // Adjust this value to control dithering amount
    let r_dithered = add_dither(r, dither_strength);
    let g_dithered = add_dither(g, dither_strength);
    let b_dithered = add_dither(b, dither_strength);

    (
        (r_dithered * 65535.0) as u16,
        (g_dithered * 65535.0) as u16,
        (b_dithered * 65535.0) as u16,
    )
}
