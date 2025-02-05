import React, { useState, useRef, useEffect } from 'react';
import { Outlet } from '@tanstack/react-router';

import MainContext, { type ActionT } from '@views/context';
import { grayscale, invert, sepia, blur, minify_image, rotate, flip } from '@wasm/dranka';

import Navigation from './navigation';
import UploadImage from './upload-image';
import ImagePreview from './image-preview';
import Root, { Main } from './main.styles';

const MainView = () => {
	const [actions, setActions] = useState<ActionT[]>([]);
	const fileReader = useRef(new FileReader());
	const [compressedImage64, setCompressedImage64] = useState('');
	const [originalImage64, setOriginalImage64] = useState('');
	const [previewImage64, setPreviewImage64] = useState('');

	useEffect(() => {
		fileReader.current.onloadend = () => {
			const result = fileReader.current.result as string;

			setOriginalImage64(result);

			const minified = minify_image(result);
			setCompressedImage64(minified);
		};
	}, []);

	useEffect(() => {
		if (!compressedImage64) return;

		setPreviewImage64(compressedImage64);
	}, [compressedImage64]);

	const hasFiltersChanged = React.useMemo(() => {
		const key = actions.map((action) => ({
			action_id: action.action_id,
			weight: action.weight
		}));

		return JSON.stringify(key);
	}, [actions]);

	useEffect(() => {
		if (!compressedImage64) return;

		const modifiedImage = applyFilters(actions, compressedImage64);

		setPreviewImage64(modifiedImage);
	}, [hasFiltersChanged]);

	const applyFilters = (actions: ActionT[], imageToModify: string) => {
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
			}
		});

		return modifiedImage;
	};

	// REFACTORED:
	const addAction = ({ action_id, weight, highlight_time, is_slider_active }: Partial<ActionT>) => {
		const cleanedActions = actions.filter((a) => a.action_id !== action_id);
		const action: ActionT = {
			action_id: action_id || '',
			weight: weight !== undefined ? weight : 100,
			highlight_time: highlight_time !== undefined ? highlight_time : 150,
			is_slider_active: typeof is_slider_active === 'boolean' ? is_slider_active : false
		};
		setActions([...cleanedActions, action]);
	};

	const updateAction = (newAction: Partial<ActionT>) => {
		const updatedActions = actions.map((action) => {
			if (action.action_id === newAction.action_id) {
				return {
					...action,
					...newAction
				};
			}

			return action;
		});

		setActions(updatedActions);
	};

	const setSliderActive = (actionId: ActionT['action_id'], isSliderActive: boolean) => {
		const updatedActions = actions.map((action) => {
			return {
				...action,
				is_slider_active: action.action_id === actionId ? isSliderActive : false
			};
		});

		setActions(updatedActions);
	};

	const setReset = () => {
		setActions([]);
	};

	const removeAction = (actionId: ActionT['action_id']) => {
		setActions(actions.filter((a) => a.action_id !== actionId));
	};

	return (
		<MainContext.Provider
			// @TODO: Replace this shit with something more reliable
			// like effector or whatever idc
			value={{
				originalImage64,
				previewImage64,
				applyFilters,

				// REFACTORED:
				actions,
				addAction,
				removeAction,
				updateAction,
				setSliderActive,
				setReset
			}}
		>
			<Root>
				<Navigation />

				<Main>
					{originalImage64 && <ImagePreview />}

					{!originalImage64 && <UploadImage fileReader={fileReader.current} />}
				</Main>

				<Outlet />
			</Root>
		</MainContext.Provider>
	);
};

export default MainView;
