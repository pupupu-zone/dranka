import React, { useMemo, useState, useContext } from 'react';

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
const ActionCard = ({ actionId, label }: Props) => {
	const [isActive, setIsActive] = useState(false);
	const { actions, addAction } = useContext(MainContext);

	const action = useMemo(() => {
		return actions.find(({ action_id }) => action_id === actionId);
	}, [actions, actionId]);

	const onPressHd = () => {
		setIsActive(true);

		switch (actionId) {
			case 'rotate-left': {
				const weight = (Number.isInteger(action?.weight) ? action?.weight : 0) as number;

				addAction({
					action_id: actionId,
					weight: normalizeAngle(weight - 90)
				});

				break;
			}

			case 'rotate-right': {
				const weight = (Number.isInteger(action?.weight) ? action?.weight : 0) as number;

				addAction({
					action_id: actionId,
					weight: normalizeAngle(weight + 90)
				});

				break;
			}

			case 'mirror-horizontal': {
				addAction({ action_id: actionId, weight: 'horizontal' });
				break;
			}

			case 'mirror-vertical': {
				addAction({ action_id: actionId, weight: 'vertical' });

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
