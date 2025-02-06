use image::{ColorType, DynamicImage, ImageBuffer, Rgb, Rgba};
use wasm_bindgen::prelude::*;

use crate::utils;

const SEPIA_MATRIX: [[f32; 3]; 3] = [
    [0.393, 0.769, 0.189], // RR RG RB
    [0.349, 0.686, 0.168], // GR GG GB
    [0.272, 0.534, 0.131], // BR BG BB
];

#[wasm_bindgen]
pub fn sepia(init_base64: &str, strength: f32) -> String {
    if init_base64.is_empty() {
        return "".to_string();
    }

    let strength = strength.clamp(0.0, 1.0);

    let img_vector = utils::base64_to_vec(&init_base64);
    let loaded_img = image::load_from_memory(&img_vector).expect("Invalid image data");
    let image_with_filter = apply_sepia(&loaded_img, strength);

    let extension = image::guess_format(&img_vector).expect("Failed to guess format");
    let image_to_send = utils::create_image(image_with_filter, extension);

    utils::vec_to_base64(image_to_send.into_inner(), extension)
}

fn proceed_pixel(r: f32, g: f32, b: f32, strength: f32) -> (u8, u8, u8) {
    let sepia_r =
        (r * SEPIA_MATRIX[0][0] + g * SEPIA_MATRIX[0][1] + b * SEPIA_MATRIX[0][2]).min(255.0);
    let sepia_g =
        (r * SEPIA_MATRIX[1][0] + g * SEPIA_MATRIX[1][1] + b * SEPIA_MATRIX[1][2]).min(255.0);
    let sepia_b =
        (r * SEPIA_MATRIX[2][0] + g * SEPIA_MATRIX[2][1] + b * SEPIA_MATRIX[2][2]).min(255.0);

    // Linear interpolation between original RGB and the sepia one
    let r = (1.0 - strength) * r + strength * sepia_r;
    let g = (1.0 - strength) * g + strength * sepia_g;
    let b = (1.0 - strength) * b + strength * sepia_b;

    (r as u8, g as u8, b as u8)
}

fn apply_sepia(img: &DynamicImage, strength: f32) -> DynamicImage {
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

                output.put_pixel(x, y, Rgb([r, g, b]));
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

                output.put_pixel(x, y, Rgba([r, g, b, a]));
            }

            DynamicImage::ImageRgba8(output)
        }
    };

    dynamic_image
}
