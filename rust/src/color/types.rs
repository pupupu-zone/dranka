pub struct ToneCurve {
    pub contrast: f32,
    /*
     * Black point can be defined as the darkest point in an image or photograph.
    	* It is the point where the color values of the pixels are at their lowest, resulting in a pure black color
    	*/
    pub black_point: f32,
    pub white_point: f32,
}

pub struct ColorGrading {
    pub saturation: f32,
    pub vibrance: f32,
    pub temperature: f32,
    pub tint: f32,
}

pub struct Curves {
    pub toe_strength: f32,
    pub toe_threshold: f32,
    pub shadow_strength: f32,
    pub shadow_threshold: f32,
    pub highlight_strength: f32,
    pub highlight_threshold: f32,
    pub shoulder_strength: f32,
    pub shoulder_threshold: f32,
}
