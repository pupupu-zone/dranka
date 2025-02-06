import React, { useContext, useMemo } from 'react';
import { useUnit } from 'effector-react';
import { $images } from '@store';
import MainContext from '@views/context';

import { HorizontalScroll } from '@ui';
import FilterCard from '@shared/filter-card';
import StrengthSlider from '@shared/strength-slider';
import Root, { SliderRoot, Test, Scroll, InnerList } from './bw.styles';

const FILTERS = [
	{ id: 'reset', label: 'Reset all' },
	{ id: 'grayscale', label: 'Grayscale' }
];

const FILTER_IDS = FILTERS.map((filter) => filter.id);

const BWActions = () => {
	const { preview64 } = useUnit($images);
	const { actions } = useContext(MainContext);

	const isSliderActive = useMemo(() => {
		const isActive = actions.some((action) => {
			return FILTER_IDS.includes(action.action_id) && action.is_slider_active;
		});

		return isActive;
	}, [actions]);

	if (!preview64) {
		return null;
	}

	return (
		<Root>
			{isSliderActive && (
				<SliderRoot>
					<StrengthSlider />
				</SliderRoot>
			)}

			<Test>
				<HorizontalScroll as={Scroll}>
					<InnerList>
						{FILTERS.map((filter) => {
							const isActive = actions.some((action) => action.action_id === filter.id);

							return <FilterCard key={filter.id} isActive={isActive} effectId={filter.id} label={filter.label} />;
						})}
					</InnerList>
				</HorizontalScroll>
			</Test>
		</Root>
	);
};

export default BWActions;
