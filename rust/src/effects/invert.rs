use wasm_bindgen::prelude::*;

use crate::utils;

#[wasm_bindgen]
pub fn invert(init_base64: &str) -> String {
    if init_base64.is_empty() {
        return "".to_string();
    }

    let img_vector = utils::base64_to_vec(&init_base64);
    let mut loaded_img = image::load_from_memory(&img_vector).expect("Invalid image data");
    loaded_img.invert();

    let extension = image::guess_format(&img_vector).expect("Failed to guess format");
    let image_to_send = utils::create_image(loaded_img, extension);

    utils::vec_to_base64(image_to_send.into_inner(), extension)
}
