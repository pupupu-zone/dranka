import React, { useState, useRef, useEffect } from 'react';
import { Outlet } from '@tanstack/react-router';

import MainContext from '@views/context';
import { grayscale, invert, sepia, blur, minify_image, rotate, flip } from '@wasm/dranka';

import Navigation from './navigation';
import UploadImage from './upload-image';
import ImagePreview from './image-preview';
import Root, { Main } from './main.styles';

const MainView = () => {
	const [activeAction, setActiveAction] = useState('');
	const [activeSlider, setActiveSlider] = useState('');
	const [strengths, setStrengths] = useState<Record<string, number>>({
		grayscale: 100,
		sepia: 100,
		blur: 10,
		invert: 100,
		angle: 0,
		isFlippedH: false,
		isFlippedV: false
	});
	const [action, setAction] = useState('');
	const [filters, setFilters] = useState<string[]>([]);

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
		const modifiedImage = applyFilters(filters, compressedImage64);

		setPreviewImage64(modifiedImage);
	}, [filters, compressedImage64, strengths]);

	useEffect(() => {
		if (!activeAction) return;

		const actionedImage = applyActions(activeAction, compressedImage64);
		const modifiedImage = applyFilters(filters, actionedImage);

		setPreviewImage64(modifiedImage);
	}, [activeAction, strengths.angle]);

	const setStr = (key: string, value: number) => {
		setStrengths({
			...strengths,
			[key]: value
		});
	};

	const applyActions = (action: string, imageToModify: string) => {
		if (action === 'rotate-right') {
			const rotatedImage64 = rotate(imageToModify, strengths.angle);

			return rotatedImage64;
		}

		if (action === 'rotate-left') {
			const rotatedImage64 = rotate(imageToModify, strengths.angle);

			return rotatedImage64;
		}

		if (action === 'mirror-horizontal') {
			const shallFlip = strengths.isFlippedH;

			const flippedImage64 = shallFlip ? flip(imageToModify, 'horizontal') : imageToModify;

			return flippedImage64;
		}

		if (action === 'mirror-vertical') {
			const shallFlip = strengths.isFlippedV;

			const flippedImage64 = shallFlip ? flip(imageToModify, 'vertical') : imageToModify;

			return flippedImage64;
		}

		return '';
	};

	const applyFilters = (filters: string[], imageToModify: string) => {
		let modifiedImage = imageToModify;

		if (filters.includes('grayscale')) {
			const strength = strengths.grayscale / 100;
			const grayImage64 = grayscale(modifiedImage, strength);

			modifiedImage = grayImage64;
		}

		if (filters.includes('invert')) {
			const strength = strengths.invert / 100;
			const invertImage = invert(modifiedImage, strength);

			modifiedImage = invertImage;
		}

		if (filters.includes('sepia')) {
			const strength = strengths.sepia / 100;
			const sepiaImage = sepia(modifiedImage, strength);

			modifiedImage = sepiaImage;
		}

		if (filters.includes('blur')) {
			const blurImage = blur(modifiedImage, strengths.blur);

			modifiedImage = blurImage;
		}

		return modifiedImage;
	};

	const addFilter = (filter: string) => {
		setFilters(Array.from(new Set([...filters, filter])));
	};

	const removeFilter = (filter: string) => {
		setFilters(filters.filter((f) => f !== filter));
	};

	const resetFilters = () => {
		setFilters([]);
	};

	const toggleFilter = (filterId: string) => {
		setActiveSlider('');

		if (filterId === 'original') {
			resetFilters();
		} else if (filters.includes(filterId)) {
			removeFilter(filterId);
		} else {
			addFilter(filterId);
		}
	};

	return (
		<MainContext.Provider
			// @TODO: Replace this shit with something more reliable
			// like effector or whatever idc
			value={{
				originalImage64,
				previewImage64,
				setAction,
				action,
				addFilter,
				removeFilter,
				appliedFilters: filters,
				resetFilters,
				toggleFilter,
				applyFilters,
				strengths,
				setStrengths: setStr,
				activeSlider,
				setActiveSlider,
				activeAction,
				setActiveAction,
				applyActions
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
