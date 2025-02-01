import React from 'react';
import type { Props } from './icon.d';
import allIconsList from './icons-list';

const iconsHash = new Map(Object.entries(allIconsList));

const Icon = ({ name, width = 24, height = 24 }: Props) => {
	const Component = iconsHash.get(name);

	if (!Component) return null;

	return <Component width={width} height={height} />;
};

export default Icon;
