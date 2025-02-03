use wasm_bindgen::prelude::*;

use crate::utils;

#[wasm_bindgen]
pub fn blur(init_base64: &str, strength: f32) -> String {
    if init_base64.is_empty() {
        return "".to_string();
    }

    let strength = strength.clamp(0.0, 100.0);

    let img_vector = utils::base64_to_vec(&init_base64);
    let loaded_img = image::load_from_memory(&img_vector).expect("Invalid image data");
    let image_with_filter = loaded_img.blur(strength);

    let extension = image::guess_format(&img_vector).expect("Failed to guess format");
    let image_to_send = utils::create_image(image_with_filter, extension);

    utils::vec_to_base64(image_to_send.into_inner(), extension)
}
