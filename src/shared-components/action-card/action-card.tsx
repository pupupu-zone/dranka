import React, { useMemo, useState } from 'react';
import { useUnit } from 'effector-react';

import $actions, { addAction, removeAction } from '@store/actions';

import previewImg from '@images/preview.jpg';

import { Button as AriaButton } from 'react-aria-components';
import Root, { Label, Preview, Img, ActiveArea } from './action-card.styles';

import type { Props } from './action-card.d';

const normalizeAngle = (angle: number) => {
	const normalized = angle % 360;

	return normalized < 0 ? normalized + 360 : normalized;
};

// @TODO: Replace images with something like icons
const ActionCard = ({ actionId, label }: Props) => {
	const [isActive, setIsActive] = useState(false);
	const actions = useUnit($actions);

	const action = useMemo(() => {
		return actions.find(({ action_id }) => action_id === actionId);
	}, [actions, actionId]);

	const onPressHd = () => {
		setIsActive(true);

		switch (actionId) {
			case 'rotate-left': {
				const rotationAction = actions.find(({ action_id }) => action_id === 'rotate');
				const weight = (Number.isInteger(rotationAction?.weight) ? rotationAction?.weight : 0) as number;
				const nextWeight = weight - 90;

				if (nextWeight === 0) {
					removeAction('rotate');
				} else {
					addAction({
						action_id: 'rotate',
						weight: normalizeAngle(nextWeight)
					});
				}

				break;
			}

			case 'rotate-right': {
				const rotationAction = actions.find(({ action_id }) => action_id === 'rotate');
				const weight = (Number.isInteger(rotationAction?.weight) ? rotationAction?.weight : 0) as number;
				const nextWeight = weight + 90;

				if (nextWeight === 0) {
					removeAction('rotate');
				} else {
					addAction({
						action_id: 'rotate',
						weight: normalizeAngle(nextWeight)
					});
				}

				break;
			}

			case 'mirror-horizontal': {
				if (action?.weight) {
					removeAction('mirror-horizontal');
				} else {
					addAction({ action_id: 'mirror-horizontal', weight: 'horizontal' });
				}

				break;
			}

			case 'mirror-vertical': {
				if (action?.weight) {
					removeAction('mirror-vertical');
				} else {
					addAction({ action_id: 'mirror-vertical', weight: 'vertical' });
				}

				break;
			}

			default:
				break;
		}

		window.setTimeout(() => {
			setIsActive(false);
		}, 150);
	};

	return (
		<Root>
			<ActiveArea as={AriaButton} onPress={onPressHd} isDisabled={isActive}>
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
