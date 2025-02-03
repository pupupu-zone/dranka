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
	const { image64, toggleFilter, appliedFilters } = useContext(MainContext);

	if (!image64) {
		return null;
	}

	return (
		<FiltersList>
			{FILTERS.map((filter) => (
				<FilterCard
					key={filter.id}
					isActive={appliedFilters.includes(filter.id)}
					effectId={filter.id}
					onPress={toggleFilter}
					label={filter.label}
				/>
			))}
		</FiltersList>
	);
};

export default EffectsActions;
