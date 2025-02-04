import { createContext } from 'react';

type MainContextT = {
	originalImage64: string;
	previewImage64: string;
	action: string;
	setAction: (action: string) => void;
	applyFilters: (filters: string[], image: string) => string;

	appliedFilters: string[];
	addFilter: (filter: string) => void;
	removeFilter: (filter: string) => void;
	resetFilters: () => void;
	toggleFilter: (filterId: string) => void;

	strengths: {
		[key: string]: number;
	};
	setStrengths: (key: string, value: number) => void;

	activeSlider: string;
	setActiveSlider: (slider: string) => void;

	// actions
	activeAction: string;
	setActiveAction: (action: string) => void;
};

const defaultContext: MainContextT = {
	originalImage64: '',
	previewImage64: '',
	action: '',
	setAction: () => {},
	applyFilters: () => '',

	appliedFilters: [],
	addFilter: () => {},
	removeFilter: () => {},
	resetFilters: () => {},
	toggleFilter: () => {},
	strengths: {},
	setStrengths: () => {},
	activeSlider: '',
	setActiveSlider: () => {},

	// actions
	activeAction: '',
	setActiveAction: () => {}
};

const MainContext = createContext(defaultContext);

export default MainContext;
