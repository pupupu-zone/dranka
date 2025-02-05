use image::{ColorType, DynamicImage, ImageBuffer, Rgb, Rgba};
use wasm_bindgen::prelude::*;

use crate::utils;

#[wasm_bindgen]
pub fn invert(init_base64: &str, strength: f32) -> String {
    if init_base64.is_empty() {
        return "".to_string();
    }
    let strength = strength.clamp(0.0, 1.0);

    let img_vector = utils::base64_to_vec(&init_base64);
    let loaded_img = image::load_from_memory(&img_vector).expect("Invalid image data");
    let modified_image = apply_invert(&loaded_img, strength);
    let extension = image::guess_format(&img_vector).expect("Failed to guess format");
    let image_to_send = utils::create_image(modified_image, extension);

    utils::vec_to_base64(image_to_send.into_inner(), extension)
}

fn apply_invert(img: &DynamicImage, strength: f32) -> DynamicImage {
    let dynamic_image = match img.color() {
        ColorType::Rgb8 | ColorType::Rgb16 | ColorType::Rgb32F => {
            let rgb_img = img.to_rgb8();
            let (width, height) = rgb_img.dimensions();
            let mut output = ImageBuffer::new(width, height);

            for (x, y, pixel) in rgb_img.enumerate_pixels() {
                let raw_r = pixel[0] as f32;
                let raw_g = pixel[1] as f32;
                let raw_b = pixel[2] as f32;

                let inverted_r = 255.0 - raw_r;
                let inverted_g = 255.0 - raw_g;
                let inverted_b = 255.0 - raw_b;

                let r = ((inverted_r * strength) + (raw_r * (1.0 - strength))) as u8;
                let g = ((inverted_g * strength) + (raw_g * (1.0 - strength))) as u8;
                let b = ((inverted_b * strength) + (raw_b * (1.0 - strength))) as u8;

                output.put_pixel(x, y, Rgb([r, g, b]));
            }

            DynamicImage::ImageRgb8(output)
        }
        _ => {
            let rgba_img = img.to_rgba8();
            let (width, height) = rgba_img.dimensions();
            let mut output = ImageBuffer::new(width, height);

            for (x, y, pixel) in rgba_img.enumerate_pixels() {
                let raw_r = pixel[0] as f32;
                let raw_g = pixel[1] as f32;
                let raw_b = pixel[2] as f32;
                let a = pixel[3] as u8;

                let inverted_r = 255.0 - raw_r;
                let inverted_g = 255.0 - raw_g;
                let inverted_b = 255.0 - raw_b;

                let r = ((inverted_r * strength) + (raw_r * (1.0 - strength))) as u8;
                let g = ((inverted_g * strength) + (raw_g * (1.0 - strength))) as u8;
                let b = ((inverted_b * strength) + (raw_b * (1.0 - strength))) as u8;

                output.put_pixel(x, y, Rgba([r, g, b, a]));
            }

            DynamicImage::ImageRgba8(output)
        }
    };

    dynamic_image
}
