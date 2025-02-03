use image::{imageops, GenericImageView};
use wasm_bindgen::prelude::*;

use crate::utils;

#[wasm_bindgen]
pub fn minify_image(init_base64: &str) -> String {
    if init_base64.is_empty() {
        return "".to_string();
    }

    let img_vector = utils::base64_to_vec(&init_base64);

    let extension = image::guess_format(&img_vector).expect("Failed to guess format");
    let loaded_img = image::load_from_memory(&img_vector).expect("Invalid image data");

    let (width, height) = loaded_img.dimensions();
    let aspect = (width as f32) / (height as f32);
    let width = width.min(640);
    let height = (width as f32 / aspect) as u32;
    let resized_img = loaded_img.resize(width, height, imageops::FilterType::Nearest);

    let new_image = utils::create_image(resized_img, extension);

    utils::vec_to_base64(new_image.into_inner(), extension)
}
