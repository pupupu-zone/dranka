import React, { useContext } from 'react';

import MainContext from '@views/context';

import { HorizontalScroll } from '@ui';
import FilterCard from '@shared/filter-card';
import StrengthSlider from '@shared/strength-slider';
import Root, { SliderRoot, Test, Scroll, InnerList } from './bw.styles';

const FILTERS = [
	{
		id: 'original',
		label: 'Original',
		type: 'filter'
	},
	{
		id: 'grayscale',
		label: 'Grayscale',
		type: 'filter'
	}
];

const BWActions = () => {
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

			<Test>
				<HorizontalScroll as={Scroll}>
					<InnerList>
						{FILTERS.map((filter) => (
							<FilterCard
								key={filter.id}
								isActive={appliedFilters.includes(filter.id)}
								effectId={filter.id}
								label={filter.label}
							/>
						))}
					</InnerList>
				</HorizontalScroll>
			</Test>
		</Root>
	);
};

export default BWActions;
