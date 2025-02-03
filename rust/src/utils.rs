use base64::prelude::*;
use image::*;
use regex::Regex;
use std::io::Cursor;

pub fn base64_to_image(init64: &str) -> Vec<u8> {
    let re = Regex::new("^data:image/[^;]+;base64,").expect("Invalid regex");

    let base64 = re.replace(init64, "").into_owned();

    let image = BASE64_STANDARD.decode(base64.as_bytes());
    let image = match image {
        Ok(image) => image,
        Err(_) => {
            return "".to_string().into();
        }
    };

    image
}

pub fn to_base64(image: Vec<u8>, extension: ImageFormat) -> String {
    let base64 = BASE64_STANDARD.encode(&image);

    format!("data:{};base64,{}", extension.to_mime_type(), base64)
}

pub fn create_image(image: DynamicImage, extension: ImageFormat) -> Cursor<Vec<u8>> {
    let mut buffer = Cursor::new(vec![]);

    image
        .write_to(&mut buffer, extension)
        .expect("Failed to write image");

    buffer
}
