import React, { useContext } from 'react';

import MainContext from '@views/context';

import FilterCard from '@shared/filter-card';
import FiltersList from '@shared/filters-list';
import StrengthSlider from '@shared/strength-slider';
import Root, { SliderRoot } from './effects.styles';

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
	const { originalImage64, appliedFilters, activeSlider } = useContext(MainContext);

	if (!originalImage64) {
		return null;
	}

	return (
		<Root>
			{Boolean(activeSlider) && (
				<SliderRoot>
					<StrengthSlider />
				</SliderRoot>
			)}

			<FiltersList>
				{FILTERS.map((filter) => (
					<FilterCard
						key={filter.id}
						isActive={appliedFilters.includes(filter.id)}
						effectId={filter.id}
						label={filter.label}
					/>
				))}
			</FiltersList>
		</Root>
	);
};

export default EffectsActions;
