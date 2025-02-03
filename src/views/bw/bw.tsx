import React, { useContext } from 'react';

import MainContext from '@views/context';

import Slider from './slider';
import { HorizontalScroll } from '@ui';
import FilterCard from '@shared/filter-card';
import Root, { SliderRoot, SliderWrap, Test, Scroll, InnerList } from './bw.styles';

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
	const { originalImage64, toggleFilter, appliedFilters, setStrengths, strengths, activeSlider, setActiveSlider } =
		useContext(MainContext);

	const onChangeHd = (strength: number) => {
		setStrengths('grayscale', strength);
	};

	if (!originalImage64) {
		return null;
	}

	return (
		<Root>
			{activeSlider === 'grayscale' && (
				<SliderRoot>
					<SliderWrap>
						<Slider externalValue={strengths.grayscale} onChange={onChangeHd} />
					</SliderWrap>
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
								onPress={toggleFilter}
								activeSlider={activeSlider}
								onAdjustPress={setActiveSlider}
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
