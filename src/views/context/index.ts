import { createContext } from 'react';

type MainContextT = {
	image64: string;
	imageToView: string;
	action: string;
	setAction: (action: string) => void;

	appliedFilters: string[];
	addFilter: (filter: string) => void;
	removeFilter: (filter: string) => void;
	resetFilters: () => void;
	toggleFilter: (filterId: string) => void;
};

const defaultContext: MainContextT = {
	image64: '',
	imageToView: '',
	action: '',
	setAction: () => {},

	appliedFilters: [],
	addFilter: () => {},
	removeFilter: () => {},
	resetFilters: () => {},
	toggleFilter: () => {}
};

const MainContext = createContext(defaultContext);

export default MainContext;
