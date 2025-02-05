import React, { useContext, useMemo } from 'react';

import MainContext from '@views/context';
import previewImg from '@images/preview.jpg';

import { Button as AriaButton } from 'react-aria-components';
import Root, { AdjustBtn, Label, Preview, Img, ActiveArea } from './filter-card.styles';

import type { Props } from './filter-card.d';

const FilterCard = ({ effectId, label, isActive }: Props) => {
	const { actions, addAction, removeAction, setSliderActive, setReset } = useContext(MainContext);

	const action = useMemo(() => {
		const action = actions.find(({ action_id }) => action_id === effectId);

		return action;
	}, [actions, effectId]);

	const onPressHd = () => {
		if (effectId === 'reset') {
			return setReset();
		}

		if (isActive) {
			removeAction(effectId);
		} else {
			addAction({
				action_id: effectId,
				weight: 100,
				highlight_time: 0
			});
		}
	};

	const onAdjustPressHd = () => {
		setSliderActive(effectId, !action?.is_slider_active);
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
				$isActive={action?.is_slider_active ?? false}
				isDisabled={effectId === 'reset' || !isActive}
				as={AriaButton}
				onPress={onAdjustPressHd}
			>
				Adjust
			</AdjustBtn>
		</Root>
	);
};

export default React.memo(FilterCard);
