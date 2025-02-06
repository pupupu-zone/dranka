use colors_transform::{Color, Hsl, Rgb};
use image::{ColorType, DynamicImage, ImageBuffer};
use wasm_bindgen::prelude::*;

use crate::utils;

const SATURATION: f32 = 0.95;

const IDENTITY_MATRIX: [[f32; 3]; 3] = [
    [1.0, 0.0, 0.0], // R
    [0.0, 1.0, 0.0], // G
    [0.0, 0.0, 1.0], // B
];

const COLOR_MATRIX: [[f32; 3]; 3] = [
    [1.02, -0.12, 0.05],
    [0.05, 0.98, -0.08],
    [-0.05, -0.10, 1.15],
];

fn apply_tone_curve(x: f32) -> f32 {
    let mut x = x / 255.0;

    if x > 0.8 {
        x = 0.8 + (0.2 * ((x - 0.8) / 0.2).powf(1.3));
    } else if x > 0.4 {
        x = x + 0.07 * (((x - 0.4) / 0.4) * (1.0 - (x - 0.4) / 0.4));
    } else {
        x = x * (0.9 + (x / 0.4) * 0.2);
    }

    x * 255.0
}

fn proceed_pixel(r: f32, g: f32, b: f32, strength: f32) -> (u8, u8, u8) {
    let hsl = Rgb::from(r, g, b).to_hsl();
    let h = hsl.get_hue();
    let s = hsl.get_saturation();
    let l = hsl.get_lightness();

    let s = s * SATURATION;
    let rgb = Hsl::from(h, s, l).to_rgb();

    let r = rgb.get_red();
    let g = rgb.get_green();
    let b = rgb.get_blue();

    let matrix = [
        [
            (1.0 - strength) * IDENTITY_MATRIX[0][0] + strength * COLOR_MATRIX[0][0],
            (1.0 - strength) * IDENTITY_MATRIX[0][1] + strength * COLOR_MATRIX[0][1],
            (1.0 - strength) * IDENTITY_MATRIX[0][2] + strength * COLOR_MATRIX[0][2],
        ],
        [
            (1.0 - strength) * IDENTITY_MATRIX[1][0] + strength * COLOR_MATRIX[1][0],
            (1.0 - strength) * IDENTITY_MATRIX[1][1] + strength * COLOR_MATRIX[1][1],
            (1.0 - strength) * IDENTITY_MATRIX[1][2] + strength * COLOR_MATRIX[1][2],
        ],
        [
            (1.0 - strength) * IDENTITY_MATRIX[2][0] + strength * COLOR_MATRIX[2][0],
            (1.0 - strength) * IDENTITY_MATRIX[2][1] + strength * COLOR_MATRIX[2][1],
            (1.0 - strength) * IDENTITY_MATRIX[2][2] + strength * COLOR_MATRIX[2][2],
        ],
    ];

    let r = r * matrix[0][0] + g * matrix[0][1] + b * matrix[0][2];
    let g = r * matrix[1][0] + g * matrix[1][1] + b * matrix[1][2];
    let b = r * matrix[2][0] + g * matrix[2][1] + b * matrix[2][2];

    let r = apply_tone_curve(r) as u8;
    let g = apply_tone_curve(g) as u8;
    let b = apply_tone_curve(b) as u8;

    (r, g, b)
}

#[wasm_bindgen]
pub fn nostalgic_neg(init_base64: &str, strength: f32) -> String {
    if init_base64.is_empty() {
        return "".to_string();
    }
    let strength = strength.clamp(0.0, 1.0);

    let img_vector = utils::base64_to_vec(&init_base64);
    let loaded_img = image::load_from_memory(&img_vector).expect("Invalid image data");
    let modified_image = apply_preset(&loaded_img, strength);
    let extension = image::guess_format(&img_vector).expect("Failed to guess format");
    let image_to_send = utils::create_image(modified_image, extension);

    utils::vec_to_base64(image_to_send.into_inner(), extension)
}

fn apply_preset(img: &DynamicImage, strength: f32) -> DynamicImage {
    let dynamic_image = match img.color() {
        ColorType::Rgb8 | ColorType::Rgb16 | ColorType::Rgb32F => {
            let rgb_img = img.to_rgb8();
            let (width, height) = rgb_img.dimensions();
            let mut output = ImageBuffer::new(width, height);

            for (x, y, pixel) in rgb_img.enumerate_pixels() {
                let r = pixel[0] as f32;
                let g = pixel[1] as f32;
                let b = pixel[2] as f32;

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
                let r = pixel[0] as f32;
                let g = pixel[1] as f32;
                let b = pixel[2] as f32;
                let a = pixel[3] as u8;

                let (r, g, b) = proceed_pixel(r, g, b, strength);

                output.put_pixel(x, y, image::Rgba([r, g, b, a]));
            }

            DynamicImage::ImageRgba8(output)
        }
    };

    dynamic_image
}
