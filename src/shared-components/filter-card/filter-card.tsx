import React from 'react';

import previewImg from '@images/preview.jpg';

import { Button as AriaButton } from 'react-aria-components';
import Root, { Edit, Label, Preview, Img, ActiveArea } from './filter-card.styles';

import type { Props } from './filter-card.d';

const FilterCard = ({ toggleFilter, setActiveSlider, activeSlider, effectId, label, isActive }: Props) => {
	const onPressHd = () => {
		toggleFilter(effectId);
	};

	const onAdjustPressHd = () => {
		if (activeSlider === effectId) {
			setActiveSlider('');
			return;
		}

		setActiveSlider(effectId);
	};

	return (
		<Root>
			<ActiveArea as={AriaButton} onPress={onPressHd}>
				<Label $isActive={isActive}>{label}</Label>

				<Preview $isActive={isActive}>
					{/* @ts-ignore */}
					<Img src={previewImg} alt="Preview" $effect={effectId} />
				</Preview>
			</ActiveArea>

			<Edit
				$isActive={activeSlider === effectId}
				isDisabled={effectId === 'original' || !isActive}
				as={AriaButton}
				onPress={onAdjustPressHd}
			>
				Adjust
			</Edit>
		</Root>
	);
};

export default React.memo(FilterCard);
