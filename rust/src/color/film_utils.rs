use crate::color::types::{ColorGrading, ToneCurve};

pub fn apply_tone_curve(x: f32, strength: f32, tone_curve: &ToneCurve) -> f32 {
    // Apply contrast
    let mut y = ((x - 0.5) * tone_curve.contrast) + 0.5;

    // Apply shadows and highlights
    if y < 0.5 {
        y = y * tone_curve.shadows;
    } else {
        y = 1.0 - ((1.0 - y) * tone_curve.highlights);
    }

    // Apply black and white points
    y = (y - tone_curve.black_point) / (tone_curve.white_point - tone_curve.black_point);

    // Blend with original based on strength
    x + (y - x) * strength
}

pub fn apply_color_grading(
    r: f32,
    g: f32,
    b: f32,
    strength: f32,
    color_grading: &ColorGrading,
) -> (f32, f32, f32) {
    let luminance = 0.299 * r + 0.587 * g + 0.114 * b;

    // Apply temperature
    let red_t = r * color_grading.temperature; // Red
    let blue_t = b / color_grading.temperature; // Blue

    // Apply tint
    let tint = g * color_grading.tint; // Green

    // Apply saturation
    let r_sat = luminance + (red_t - luminance) * color_grading.saturation;
    let g_sat = luminance + (tint - luminance) * color_grading.saturation;
    let b_sat = luminance + (blue_t - luminance) * color_grading.saturation;

    // Calculate saturation factors for vibrance
    let red_sat_factor = 1.0 - ((red_t - 0.5).abs() * 2.0);
    let green_sat_factor = 1.0 - ((tint - 0.5).abs() * 2.0);
    let blue_sat_factor = 1.0 - ((blue_t - 0.5).abs() * 2.0);

    // Apply vibrance with strength blending
    let r_final = r
        + ((luminance
            + (r_sat - luminance) * (1.0 + (color_grading.vibrance - 1.0) * red_sat_factor))
            - r)
            * strength;
    let g_final = g
        + ((luminance
            + (g_sat - luminance) * (1.0 + (color_grading.vibrance - 1.0) * green_sat_factor))
            - g)
            * strength;
    let b_final = b
        + ((luminance
            + (b_sat - luminance) * (1.0 + (color_grading.vibrance - 1.0) * blue_sat_factor))
            - b)
            * strength;

    (
        r_final.max(0.0).min(1.0),
        g_final.max(0.0).min(1.0),
        b_final.max(0.0).min(1.0),
    )
}
