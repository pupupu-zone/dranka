import { useUnit } from 'effector-react';
import $actions from '@store/actions';

import {
	grayscale,
	invert,
	sepia,
	blur,
	rotate,
	flip,
	astia,
	nostalgic_neg,
	neg_hi,
	classic_neg,
	eterna_cinema,
	provia_std,
	velvia_vivid,
	neg_std,
	bleach
} from '@wasm/dranka';

const useApplyFilters = () => {
	const actions = useUnit($actions);

	const modifyImage = (imageToModify: string) => {
		let modifiedImage = imageToModify;

		const rotationAction = actions.find((action) => action.action_id === 'rotate');
		const flipHorizontal = actions.find((action) => action.action_id === 'mirror-horizontal');
		const flipVertical = actions.find((action) => action.action_id === 'mirror-vertical');

		if (rotationAction && typeof rotationAction.weight === 'number') {
			modifiedImage = rotate(modifiedImage, rotationAction.weight);
		}

		if (flipHorizontal) {
			modifiedImage = flip(modifiedImage, 'horizontal');
		}

		if (flipVertical) {
			modifiedImage = flip(modifiedImage, 'vertical');
		}

		actions.forEach((action) => {
			switch (action.action_id) {
				case 'grayscale': {
					const strength = typeof action.weight === 'number' ? action.weight / 100 : 1;
					modifiedImage = grayscale(modifiedImage, strength);
					break;
				}
				case 'invert': {
					const strength = typeof action.weight === 'number' ? action.weight / 100 : 1;
					modifiedImage = invert(modifiedImage, strength);
					break;
				}
				case 'sepia': {
					const strength = typeof action.weight === 'number' ? action.weight / 100 : 1;
					modifiedImage = sepia(modifiedImage, strength);
					break;
				}
				case 'blur': {
					if (typeof action.weight === 'number') {
						modifiedImage = blur(modifiedImage, action.weight);
					}
					break;
				}

				// Films
				case 'astia-soft': {
					const strength = typeof action.weight === 'number' ? action.weight / 100 : 1;

					modifiedImage = astia(modifiedImage, strength);
					break;
				}
				case 'nostalgic': {
					const strength = typeof action.weight === 'number' ? action.weight / 100 : 1;

					modifiedImage = nostalgic_neg(modifiedImage, strength);
					break;
				}
				case 'neg-hi': {
					const strength = typeof action.weight === 'number' ? action.weight / 100 : 1;

					modifiedImage = neg_hi(modifiedImage, strength);
					break;
				}
				case 'neg-std': {
					const strength = typeof action.weight === 'number' ? action.weight / 100 : 1;

					modifiedImage = neg_std(modifiedImage, strength);
					break;
				}
				case 'provia-std': {
					const strength = typeof action.weight === 'number' ? action.weight / 100 : 1;

					modifiedImage = provia_std(modifiedImage, strength);
					break;
				}
				case 'velvia-vivid': {
					const strength = typeof action.weight === 'number' ? action.weight / 100 : 1;

					modifiedImage = velvia_vivid(modifiedImage, strength);
					break;
				}
				case 'bleach-bypass': {
					const strength = typeof action.weight === 'number' ? action.weight / 100 : 1;

					modifiedImage = bleach(modifiedImage, strength);
					break;
				}
				case 'classic-neg': {
					const strength = typeof action.weight === 'number' ? action.weight / 100 : 1;

					modifiedImage = classic_neg(modifiedImage, strength);
					break;
				}
				case 'eterna-cinema': {
					const strength = typeof action.weight === 'number' ? action.weight / 100 : 1;

					modifiedImage = eterna_cinema(modifiedImage, strength);
					break;
				}
			}
		});

		return modifiedImage;
	};

	return modifyImage;
};

export default useApplyFilters;
