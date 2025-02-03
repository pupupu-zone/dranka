use image::*;
use wasm_bindgen::prelude::*;

use crate::utils;

#[wasm_bindgen]
pub fn grayscale(init_base64: &str, strength: f32) -> String {
    if init_base64.is_empty() {
        return "".to_string();
    }

    let strength = strength.clamp(0.0, 1.0);
    let wrk_image = utils::base64_to_image(&init_base64);

    let extension = image::guess_format(&wrk_image).expect("Failed to guess format");
    let wrk_image = load_from_memory(&wrk_image).expect("Invalid image data");

    let modified_image = adjust_grayscale(&wrk_image, strength);
    let new_image = utils::create_image(modified_image, extension);

    utils::to_base64(new_image.into_inner(), extension)
}

/*
 * We don't use default function because it doesn't have a strength param
 */
fn adjust_grayscale(img: &DynamicImage, strength: f32) -> DynamicImage {
    let weight = 1.0 - strength;

    let dynamic_image = match img.color() {
        ColorType::Rgb8 | ColorType::Rgb16 | ColorType::Rgb32F => {
            let rgb_img = img.to_rgb8();
            let (width, height) = rgb_img.dimensions();
            let mut output = ImageBuffer::new(width, height);

            for (x, y, pixel) in rgb_img.enumerate_pixels() {
                let r = pixel[0] as f32;
                let g = pixel[1] as f32;
                let b = pixel[2] as f32;

                let gray = 0.3 * r + 0.6 * g + 0.12 * b;

                let r = r * weight + gray * strength;
                let g = g * weight + gray * strength;
                let b = b * weight + gray * strength;

                output.put_pixel(x, y, Rgb([r as u8, g as u8, b as u8]));
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
                let a = pixel[3] as f32;

                let gray = 0.3 * r + 0.6 * g + 0.12 * b;

                let r = r * weight + gray * strength;
                let g = g * weight + gray * strength;
                let b = b * weight + gray * strength;

                output.put_pixel(x, y, Rgba([r as u8, g as u8, b as u8, a as u8]));
            }

            DynamicImage::ImageRgba8(output)
        }
    };

    dynamic_image
}
