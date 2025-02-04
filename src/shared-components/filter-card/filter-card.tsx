import React, { useContext } from 'react';

import MainContext from '@views/context';
import previewImg from '@images/preview.jpg';

import { Button as AriaButton } from 'react-aria-components';
import Root, { AdjustBtn, Label, Preview, Img, ActiveArea } from './filter-card.styles';

import type { Props } from './filter-card.d';

const FilterCard = ({ effectId, label, isActive }: Props) => {
	const { activeSlider, toggleFilter, setActiveSlider } = useContext(MainContext);

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

			<AdjustBtn
				$isActive={activeSlider === effectId}
				isDisabled={effectId === 'original' || !isActive}
				as={AriaButton}
				onPress={onAdjustPressHd}
			>
				Adjust
			</AdjustBtn>
		</Root>
	);
};

export default React.memo(FilterCard);
