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
		id: 'rotate-left',
		label: 'Left',
		type: 'action'
	},
	{
		id: 'rotate-free',
		label: 'Free',
		type: 'action'
	},
	{
		id: 'rotate-right',
		label: 'Right',
		type: 'action'
	},

	{
		id: 'mirror-horizontal',
		label: 'Mirror H',
		type: 'action'
	},
	{
		id: 'mirror-vertical',
		label: 'Mirror V',
		type: 'action'
	}
];

const RotateActions = () => {
	const { originalImage64, toggleFilter, appliedFilters } = useContext(MainContext);

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
					onPress={toggleFilter}
					label={filter.label}
				/>
			))}
		</FiltersList>
	);
};

export default RotateActions;
