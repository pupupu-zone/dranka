import { createContext } from 'react';

const nope = () => {};

type StrengthWeight = number;
type AngleWeight = number;
type FlipWeight = 'horizontal' | 'vertical';

export type ActionT = {
	action_id: string;
	weight: StrengthWeight | AngleWeight | FlipWeight;
	highlight_time: number;
	is_slider_active: boolean;
};

type MainContextT = {
	originalImage64: string;
	previewImage64: string;
	applyFilters: (actions: ActionT[], imageToModify: string) => string;

	// REFACTORED PART:
	actions: ActionT[];
	addAction: (action: Partial<ActionT>) => void;
	removeAction: (actionId: ActionT['action_id']) => void;
	updateAction: (newAction: Partial<ActionT>) => void;
	setSliderActive: (actionId: ActionT['action_id'], isSliderActive: boolean) => void;
	setReset: () => void;
};

const defaultContext: MainContextT = {
	originalImage64: '',
	previewImage64: '',
	applyFilters: () => '',

	// REFACTORED PART:
	actions: [],
	addAction: nope,
	removeAction: nope,
	updateAction: nope,
	setSliderActive: nope,
	setReset: nope
};

const MainContext = createContext(defaultContext);

export default MainContext;
