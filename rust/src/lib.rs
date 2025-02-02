use base64::prelude::*;
use image::*;
use regex::Regex;
use std::io::Cursor;
use wasm_bindgen::prelude::wasm_bindgen;

fn prepare_base64(init64: &str) -> String {
    let re = Regex::new("^data:image/[^;]+;base64,").expect("Invalid regex");

    re.replace(init64, "").into_owned()
}

fn base64_to_image(base64: &str) -> Vec<u8> {
    let image = BASE64_STANDARD.decode(base64.as_bytes());
    let image = match image {
        Ok(image) => image,
        Err(_) => {
            return "".to_string().into();
        }
    };

    image
}

fn to_base64(image: Vec<u8>) -> String {
    let base64 = BASE64_STANDARD.encode(&image);

    format!("data:image/webp;base64,{}", base64)
}

fn get_image(base64_img: &str) -> DynamicImage {
    let base64 = prepare_base64(base64_img);
    let image = base64_to_image(&base64);
    load_from_memory(&image).expect("Invalid image data")
}

fn create_image(image: DynamicImage) -> Cursor<Vec<u8>> {
    let mut buffer = Cursor::new(vec![]);

    image
        .write_to(&mut buffer, ImageFormat::WebP)
        .expect("Failed to write image");

    buffer
}

fn adjust_grayscale(img: &DynamicImage, strength: f32) -> DynamicImage {
    let rgba_img = img.to_rgba8();
    let (width, height) = rgba_img.dimensions();
    let mut output = ImageBuffer::new(width, height);

    for (x, y, pixel) in rgba_img.enumerate_pixels() {
        // Calculate grayscale value using luminance formula (numbers are luma coefficients)
        let gray = (0.3 * pixel[0] as f32 + 0.6 * pixel[1] as f32 + 0.12 * pixel[2] as f32) as u8;

        // Interpolate between original and grayscale
        let r = (pixel[0] as f32 * (1.0 - strength) + gray as f32 * strength) as u8;
        let g = (pixel[1] as f32 * (1.0 - strength) + gray as f32 * strength) as u8;
        let b = (pixel[2] as f32 * (1.0 - strength) + gray as f32 * strength) as u8;
        let a = pixel[3];

        output.put_pixel(x, y, Rgba([r, g, b, a]));
    }

    DynamicImage::ImageRgba8(output)
}

#[wasm_bindgen]
pub fn grayscale(init_base64: &str, strength: f32) -> String {
    if init_base64.is_empty() {
        return "".to_string();
    }

    let strength = strength.clamp(0.0, 1.0);
    let image = get_image(&init_base64);
    let modified_image = adjust_grayscale(&image, strength);
    let new_image = create_image(modified_image);

    to_base64(new_image.into_inner())
}
