use image::*;
use wasm_bindgen::prelude::*;

use crate::utils;

#[wasm_bindgen]
pub fn sepia(init_base64: &str, strength: f32) -> String {
    if init_base64.is_empty() {
        return "".to_string();
    }

    let strength = strength.clamp(0.0, 1.0);
    let image = utils::base64_to_image(init_base64);

    let extension = image::guess_format(&image).expect("Failed to guess format");
    let image = load_from_memory(&image).expect("Invalid image data");

    let modified_image = apply_sepia(&image, strength);
    let new_image = utils::create_image(modified_image, extension);

    utils::to_base64(new_image.into_inner(), extension)
}

fn apply_sepia(img: &DynamicImage, strength: f32) -> DynamicImage {
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

                let sepia_r = (0.393 * r + 0.769 * g + 0.189 * b).min(255.0);
                let sepia_g = (0.349 * r + 0.686 * g + 0.168 * b).min(255.0);
                let sepia_b = (0.272 * r + 0.534 * g + 0.131 * b).min(255.0);

                let r = (r * weight + sepia_r * strength) as u8;
                let g = (g * weight + sepia_g * strength) as u8;
                let b = (b * weight + sepia_b * strength) as u8;

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

                let sepia_r = (0.393 * r + 0.769 * g + 0.189 * b).min(255.0);
                let sepia_g = (0.349 * r + 0.686 * g + 0.168 * b).min(255.0);
                let sepia_b = (0.272 * r + 0.534 * g + 0.131 * b).min(255.0);

                let r = (r * weight + sepia_r * strength) as u8;
                let g = (g * weight + sepia_g * strength) as u8;
                let b = (b * weight + sepia_b * strength) as u8;

                output.put_pixel(x, y, Rgba([r, g, b, a]));
            }

            DynamicImage::ImageRgba8(output)
        }
    };

    dynamic_image
}
