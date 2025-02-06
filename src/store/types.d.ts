type StrengthWeight = number;
type AngleWeight = number;
type FlipWeight = 'horizontal' | 'vertical';

export type ActionT = {
	action_id: string;
	weight: StrengthWeight | AngleWeight | FlipWeight;
	highlight_time: number;
	is_slider_active: boolean;
};

export type ActionsStoreT = ActionT[];

export type ImageStoreT = {
	original64: string;
	compressed64: string;
	preview64: string;
};
