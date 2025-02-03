import React from 'react';

import previewImg from '@images/preview.jpg';

import { Button as AriaButton } from 'react-aria-components';
import Root, { Label, Preview, Img } from './filter-card.styles';

import type { Props } from './filter-card.d';

const FilterCard = ({ onPress, effectId, label, isActive }: Props) => {
	const onPressHd = () => onPress(effectId);

	return (
		<Root as={AriaButton} onPress={onPressHd}>
			<Preview $isActive={isActive}>
				{/* @ts-ignore */}
				<Img src={previewImg} alt="Preview" $effect={effectId} />
			</Preview>

			<Label $isActive={isActive}>{label}</Label>
		</Root>
	);
};

export default React.memo(FilterCard);
