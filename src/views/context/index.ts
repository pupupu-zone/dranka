import { createContext } from 'react';

type MainContextT = {
	image64: string;
	isBarHidden: boolean;
	action: string;
	setAction: (action: string) => void;
};

const defaultContext: MainContextT = {
	image64: '',
	isBarHidden: false,
	action: '',
	setAction: () => {}
};

const MainContext = createContext(defaultContext);

export default MainContext;
