use crate::color::types::{ColorGrading, Curves, ToneCurve};

pub fn apply_curve(x: f32, strength: f32, curves: &Curves, tone_curve: &ToneCurve) -> f32 {
    /*
     * Normalize input
     *
     * So we will work with defined range of input
     */
    let x = x.clamp(0.0, 1.0);

    /*
     * Apply black and white point normalization
     *
     * Stretches or compresses the tonal range to fit between the black point and white point
     * black_point is where true black should start; Values below black_point get mapped to 0
     * white_point is where true white should start; Values above white_point get mapped to 1
     * tone_curve.white_point - tone_curve.black_point calculates the new range
     */
    let x = (x - tone_curve.black_point) / (tone_curve.white_point - tone_curve.black_point);

    let y = if x < curves.toe_threshold {
        // Toe region - very dark shadows

        /*
         * Make the curve scale-independent by converting the input to a relative value
         */
        let normalized = x / curves.toe_threshold;

        /*
         * Create S-shaped (logistic) curve from 0 to 1 (bright highlights)
         */
        let curved = 1.0 / (1.0 + (-normalized * curves.toe_strength).exp());

        /*
         * Scale the curve back to the original range
         */
        curved * curves.toe_threshold
    } else if x < curves.shadow_threshold {
        // Shadow region

        /*
         * convert to range 0..1,
         * we have to subtract toe_threshold to get a minimum value
         * and use shadow_threshold as a maximum value
         */
        let normalized =
            (x - curves.toe_threshold) / (curves.shadow_threshold - curves.toe_threshold);

        let curved = normalized * (1.0 - curves.shadow_strength)
            + normalized.powi(2) * curves.shadow_strength;

        curves.toe_threshold + curved * (curves.shadow_threshold - curves.toe_threshold)
    } else if x < curves.highlight_threshold {
        // Midtone region

        /* convert to range 0..1 */
        let normalized =
            (x - curves.shadow_threshold) / (curves.highlight_threshold - curves.shadow_threshold);
        let curved = ((normalized - 0.5) * tone_curve.contrast) + 0.5;
        curves.shadow_threshold + curved * (curves.highlight_threshold - curves.shadow_threshold)
    } else if x < curves.shoulder_threshold {
        // Highlight region

        /* convert to range 0..1 */
        let normalized = (x - curves.highlight_threshold)
            / (curves.shoulder_threshold - curves.highlight_threshold);

        let curved = 1.0 - ((1.0 - normalized) * curves.highlight_strength);

        curves.highlight_threshold
            + curved * (curves.shoulder_threshold - curves.highlight_threshold)
    } else {
        // Shoulder region - extreme highlights
        // x

        /* convert to range 0..1 */
        let normalized = (x - curves.shoulder_threshold) / (1.0 - curves.shoulder_threshold);

        let curved = 1.0 / (1.0 + (-normalized * curves.shoulder_strength).exp());

        curves.shoulder_threshold + curved * (1.0 - curves.shoulder_threshold)
    };

    // Final blend
    let y = y.clamp(0.0, 1.0);
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
