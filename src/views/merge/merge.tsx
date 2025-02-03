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
		id: 'merge-add',
		label: 'Add',
		type: 'action'
	},
	{
		id: 'merge-delete',
		label: 'Delete',
		type: 'action'
	}
];

const MergeActions = () => {
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

export default MergeActions;
