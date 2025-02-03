import React, { useContext } from 'react';

import MainContext from '@views/context';

import FilterCard from '@shared/filter-card';
import FiltersList from '@shared/filters-list';

const FILTERS = [
	{
		id: 'original',
		label: 'Original'
	},
	{
		id: 'invert',
		label: 'Invert'
	},
	{
		id: 'sepia',
		label: 'Sepia'
	},
	{
		id: 'blur',
		label: 'Blur'
	}
];

const EffectsActions = () => {
	const { isBarHidden, image64, setAction } = useContext(MainContext);

	if (!image64 || isBarHidden) {
		return null;
	}

	return (
		<FiltersList>
			{FILTERS.map((filter) => (
				<FilterCard key={filter.id} effectId={filter.id} onPress={setAction} label={filter.label} />
			))}
		</FiltersList>
	);
};

export default EffectsActions;
