import allIconsList from './icons-list';

export type Props = {
	name: keyof typeof allIconsList;
	width?: number;
	height?: number;
};
