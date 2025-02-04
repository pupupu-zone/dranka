import React, { useState, useContext } from 'react';

import MainContext from '@views/context';
import previewImg from '@images/preview.jpg';

import { Button as AriaButton } from 'react-aria-components';
import Root, { Label, Preview, Img, ActiveArea } from './action-card.styles';

import type { Props } from './action-card.d';

const normalizeAngle = (angle: number) => {
	const normalized = angle % 360;

	return normalized < 0 ? normalized + 360 : normalized;
};

// @TODO: Replace images with something like icons
const ActionCard = ({ actionId, label, type }: Props) => {
	const [isDisabled, setIsDisabled] = useState(false);
	const { activeAction, setActiveAction, strengths, setStrengths } = useContext(MainContext);
	const isActive = activeAction === actionId;

	const onPressHd = () => {
		setIsDisabled(true);

		if (actionId === 'rotate-left') {
			setStrengths('angle', normalizeAngle(strengths.angle - 90));
		}

		if (actionId === 'rotate-right') {
			setStrengths('angle', normalizeAngle(strengths.angle + 90));
		}

		if (actionId === 'mirror-horizontal') {
			setStrengths('isFlippedH', strengths.isFlippedH ? false : true);
		}

		if (actionId === 'mirror-vertical') {
			setStrengths('isFlippedV', strengths.isFlippedV ? false : true);
		}

		setActiveAction(actionId);

		window.setTimeout(() => {
			setActiveAction('');
			setIsDisabled(false);
		}, 150);
	};

	return (
		<Root>
			<ActiveArea as={AriaButton} onPress={onPressHd} isDisabled={isDisabled}>
				<Preview $isActive={isActive}>
					{/* @ts-ignore */}
					<Img src={previewImg} alt="Preview" />
				</Preview>

				<Label $isActive={isActive}>{label}</Label>
			</ActiveArea>
		</Root>
	);
};

export default React.memo(ActionCard);
