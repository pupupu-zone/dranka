import { useUnit } from 'effector-react';
import $actions from '@store/actions';

import { grayscale, invert, sepia, blur, rotate, flip, astia_soft, nostalgic_neg, neg_hi } from '@wasm/dranka';

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
				case 'astia-soft': {
					const strength = typeof action.weight === 'number' ? action.weight / 100 : 1;

					modifiedImage = astia_soft(modifiedImage, strength);
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
			}
		});

		return modifiedImage;
	};

	return modifyImage;
};

export default useApplyFilters;
