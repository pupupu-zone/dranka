import { createContext } from 'react';

type MainContextT = {
	image64: string;
	action: string;
	setAction: (action: string) => void;
};

const defaultContext: MainContextT = {
	image64: '',
	action: '',
	setAction: () => {}
};

const MainContext = createContext(defaultContext);

export default MainContext;
