pub struct ToneCurve {
    pub shadows: f32,
    pub highlights: f32,
    pub contrast: f32,
    pub black_point: f32,
    pub white_point: f32,
}

pub struct ColorGrading {
    pub saturation: f32,
    pub vibrance: f32,
    pub temperature: f32,
    pub tint: f32,
}
