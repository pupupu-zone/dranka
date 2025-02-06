import React, { useRef, useEffect } from 'react';
import { Outlet } from '@tanstack/react-router';

import { useUnit } from 'effector-react';
import $images, { setOriginal64, setPreview64 } from '@store/images';
import $actions from '@store/actions';
import { useApplyFilters } from '@hooks';

import Navigation from './navigation';
import UploadImage from './upload-image';
import ImagePreview from './image-preview';
import Root, { Main } from './main.styles';

const MainView = () => {
	const images = useUnit($images);
	const actions = useUnit($actions);
	const fileReader = useRef(new FileReader());
	const applyFilters = useApplyFilters();

	useEffect(() => {
		fileReader.current.onloadend = () => {
			const result = fileReader.current.result as string;

			setOriginal64(result);
		};
	}, []);

	const hasFiltersChanged = React.useMemo(() => {
		const key = actions.map((action) => ({
			action_id: action.action_id,
			weight: action.weight
		}));

		return JSON.stringify(key);
	}, [actions]);

	useEffect(() => {
		if (!images.compressed64) return;

		const modifiedImage = applyFilters(images.compressed64);

		setPreview64(modifiedImage);
	}, [hasFiltersChanged]);

	return (
		<Root>
			<Navigation />

			<Main>
				{images.preview64 && <ImagePreview />}

				{!images.preview64 && <UploadImage fileReader={fileReader.current} />}
			</Main>

			<Outlet />
		</Root>
	);
};

export default MainView;
