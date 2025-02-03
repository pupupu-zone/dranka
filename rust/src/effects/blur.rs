use image::*;
use wasm_bindgen::prelude::*;

use crate::utils;

#[wasm_bindgen]
pub fn blur(init_base64: &str, strength: f32) -> String {
    if init_base64.is_empty() {
        return "".to_string();
    }

    let strength = strength.clamp(0.0, 100.0);
    let image = utils::base64_to_image(init_base64);

    let extension = image::guess_format(&image).expect("Failed to guess format");
    let image = load_from_memory(&image).expect("Invalid image data");

    let modified_image = image.blur(strength);
    let new_image = utils::create_image(modified_image, extension);

    utils::to_base64(new_image.into_inner(), extension)
}
