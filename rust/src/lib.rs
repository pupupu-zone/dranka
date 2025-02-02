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
    let base64 = format!("data:image/webp;base64,{}", base64);

    base64
}

#[wasm_bindgen]
pub fn grayscale(init_base64: &str) -> String {
    if init_base64.is_empty() {
        return "".to_string();
    }

    let base64 = prepare_base64(init_base64);
    let image = base64_to_image(&base64);

    let image = load_from_memory(&image).expect("Invalid image data");
    let image = image.grayscale();

    let mut buffer = Cursor::new(vec![]);
    image
        .write_to(&mut buffer, ImageFormat::WebP)
        .expect("Failed to write image");

    to_base64(buffer.into_inner())
}
