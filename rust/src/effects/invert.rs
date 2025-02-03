use image::*;
use wasm_bindgen::prelude::*;

use crate::utils;

#[wasm_bindgen]
pub fn invert(init_base64: &str) -> String {
    if init_base64.is_empty() {
        return "".to_string();
    }

    let image = utils::base64_to_image(init_base64);

    let extension = image::guess_format(&image).expect("Failed to guess format");
    let mut image = load_from_memory(&image).expect("Invalid image data");

    image.invert();
    let new_image = utils::create_image(image, extension);

    utils::to_base64(new_image.into_inner(), extension)
}
