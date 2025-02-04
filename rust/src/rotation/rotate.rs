use crate::utils;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn rotate(init_base64: &str, angle: i32) -> String {
    if init_base64.is_empty() {
        return "".to_string();
    }

    let img_vector = utils::base64_to_vec(&init_base64);
    let loaded_img = image::load_from_memory(&img_vector).expect("Invalid image data");

    let image_with_filter = match angle {
        90 => loaded_img.rotate90(),
        180 => loaded_img.rotate180(),
        270 => loaded_img.rotate270(),
        _ => return init_base64.to_string(),
    };

    let extension = image::guess_format(&img_vector).expect("Failed to guess format");
    let image_to_send = utils::create_image(image_with_filter, extension);

    utils::vec_to_base64(image_to_send.into_inner(), extension)
}
