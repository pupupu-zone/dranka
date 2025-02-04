import React, { useContext } from 'react';

import MainContext from '@views/context';

import FilterCard from '@shared/filter-card';
import FiltersList from '@shared/filters-list';

const FILTERS = [
	{
		id: 'original',
		label: 'Original',
		type: 'filter'
	},
	{
		id: 'invert',
		label: 'Invert',
		type: 'filter'
	},
	{
		id: 'sepia',
		label: 'Sepia',
		type: 'filter'
	},
	{
		id: 'blur',
		label: 'Blur',
		type: 'filter'
	}
];

const EffectsActions = () => {
	const { originalImage64, toggleFilter, appliedFilters, setActiveSlider } = useContext(MainContext);

	if (!originalImage64) {
		return null;
	}

	return (
		<FiltersList>
			{FILTERS.map((filter) => (
				<FilterCard
					key={filter.id}
					isActive={appliedFilters.includes(filter.id)}
					effectId={filter.id}
					toggleFilter={toggleFilter}
					setActiveSlider={setActiveSlider}
					label={filter.label}
				/>
			))}
		</FiltersList>
	);
};

export default EffectsActions;
