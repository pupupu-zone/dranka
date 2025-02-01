import React from 'react';

import { Button as AriaButton } from 'react-aria-components';
import Root, { FilterCard } from './filters.styles';

const FILTERS = [
	{
		id: 'grayscale',
		label: 'Grayscale',
		defaultValue: 50
	},
	{
		id: 'invert',
		label: 'Invert colors',
		defaultValue: 75
	},
	{
		id: 'sepia',
		label: 'Sepia',
		defaultValue: 25
	}
];

const FiltersView = () => (
	<Root>
		{FILTERS.map((filter) => (
			<FilterCard key={filter.id} as={AriaButton}>
				{filter.label}
			</FilterCard>
		))}
	</Root>
);

export default FiltersView;
