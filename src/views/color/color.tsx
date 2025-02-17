import React, { useMemo } from 'react';
import { useUnit } from 'effector-react';

import $images from '@store/images';
import $actions from '@store/actions';

import { HorizontalScroll } from '@ui';
import FilterCard from '@shared/filter-card';
import StrengthSlider from '@shared/strength-slider';
import Root, { SliderRoot, Test, Scroll, InnerList } from './color.styles';

const FILTERS = [
	{ id: 'reset', label: 'Reset all' },
	{ id: 'astia-soft', label: 'A-Soft' },
	{ id: 'bleach-bypass', label: 'Bleach' },
	{ id: 'classic-neg', label: 'Classic Neg' },
	{ id: 'eterna-cinema', label: 'Eterna' },
	{ id: 'provia-std', label: 'Provia' },
	{ id: 'velvia-vivid', label: 'Velvia' },
	{ id: 'nostalgic', label: 'Nostalgic' },
	{ id: 'neg-hi', label: 'Neg-Hi' },
	{ id: 'neg-std', label: 'Nrg-Std' }
];

const FILTER_IDS = FILTERS.map((filter) => filter.id);

const ColorActions = () => {
	const { preview64 } = useUnit($images);
	const actions = useUnit($actions);

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

export default ColorActions;
