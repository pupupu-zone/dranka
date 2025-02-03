import { createContext } from 'react';

type MainContextT = {
	image64: string;
	imageToView: string;
	isBarHidden: boolean;
	action: string;
	setAction: (action: string) => void;
};

const defaultContext: MainContextT = {
	image64: '',
	imageToView: '',
	isBarHidden: false,
	action: '',
	setAction: () => {}
};

const MainContext = createContext(defaultContext);

export default MainContext;
