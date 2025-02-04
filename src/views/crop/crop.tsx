import React, { useContext } from 'react';

import MainContext from '@views/context';

import FilterCard from '@shared/filter-card';
import FiltersList from '@shared/filters-list';

const ACTIONS = [
	{
		id: 'reset',
		label: 'Reset',
		type: 'action'
	},
	{
		id: 'crop-free',
		label: 'Free',
		type: 'action'
	},
	{
		id: 'crop-11',
		label: '1:1',
		type: 'action'
	},
	{
		id: 'crop-32',
		label: '3:2',
		type: 'action'
	},
	{
		id: 'crop-43',
		label: '4:3',
		type: 'action'
	},

	{
		id: 'crop-54',
		label: '5:4',
		type: 'action'
	}
];

const CropActions = () => {
	const { originalImage64, toggleFilter, appliedFilters, setActiveSlider } = useContext(MainContext);

	if (!originalImage64) {
		return null;
	}

	return (
		<FiltersList>
			{ACTIONS.map((filter) => (
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

export default CropActions;
