import React, { useContext, useMemo } from 'react';
import { useUnit } from 'effector-react';
import { $images } from '@store';
import MainContext from '@views/context';

import FilterCard from '@shared/filter-card';
import FiltersList from '@shared/filters-list';
import StrengthSlider from '@shared/strength-slider';
import Root, { SliderRoot } from './effects.styles';

const FILTERS = [
	{ id: 'reset', label: 'Original' },
	{ id: 'invert', label: 'Invert' },
	{ id: 'sepia', label: 'Sepia' },
	{ id: 'blur', label: 'Blur' }
];

const FILTER_IDS = FILTERS.map((filter) => filter.id);

const EffectsActions = () => {
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

			<FiltersList>
				{FILTERS.map((filter) => {
					const isActive = actions.some((action) => action.action_id === filter.id);

					return <FilterCard key={filter.id} isActive={isActive} effectId={filter.id} label={filter.label} />;
				})}
			</FiltersList>
		</Root>
	);
};

export default EffectsActions;
