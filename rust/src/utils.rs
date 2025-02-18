use base64::prelude::BASE64_STANDARD;
use base64::Engine;
use image::{DynamicImage, ImageFormat};
use regex::Regex;
use std::io::Cursor;

pub fn base64_to_vec(init64: &str) -> Vec<u8> {
    let re = Regex::new("^data:image/[^;]+;base64,").expect("Invalid regex");
    let clear_base64 = re.replace(init64, "").into_owned();

    let wrk_image = BASE64_STANDARD
        .decode(clear_base64.as_bytes())
        .expect("Something wrong with yourbase64. Try another alphabet?");

    wrk_image
}

pub fn vec_to_base64(wrk_image: Vec<u8>, extension: ImageFormat) -> String {
    let encoded_base64 = BASE64_STANDARD.encode(&wrk_image);

    format!(
        "data:{};base64,{}",
        extension.to_mime_type(),
        encoded_base64
    )
}

pub fn create_image(wrk_image: DynamicImage, extension: ImageFormat) -> Cursor<Vec<u8>> {
    let mut buffer = Cursor::new(vec![]);

    let output_image = match wrk_image {
        DynamicImage::ImageRgb16(_) => wrk_image.to_rgb8().into(),
        DynamicImage::ImageRgba16(_) => wrk_image.to_rgba8().into(),
        _ => wrk_image,
    };

    output_image
        .write_to(&mut buffer, extension)
        .expect("Failed to write image");

    buffer
}

pub fn proceed_image(
    strength: f32,
    init_base64: &str,
    apply_preset: &dyn Fn(&DynamicImage, f32) -> DynamicImage,
) -> String {
    let strength = strength.clamp(0.0, 1.0);

    let img_vector = base64_to_vec(&init_base64);
    let loaded_img = image::load_from_memory(&img_vector).expect("Invalid image data");
    let modified_image = apply_preset(&loaded_img, strength);
    let extension = image::guess_format(&img_vector).expect("Failed to guess format");
    let image_to_send = create_image(modified_image, extension);

    vec_to_base64(image_to_send.into_inner(), extension)
}
