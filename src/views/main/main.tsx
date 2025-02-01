import React, { useRef, useState, useEffect } from 'react';
import { Outlet } from '@tanstack/react-router';

import Controls from './controls';
import { HorizontalScroll } from '@ui';
import UploadImage from './upload-image';
import ImagePreview from './image-preview';
import Root, { Header } from './main.styles';

const MainView = () => {
	const fileReader = useRef(new FileReader());
	const [image64, setImage64] = useState('');

	useEffect(() => {
		fileReader.current.onloadend = () => {
			const result = fileReader.current.result as string;

			setImage64(result);
		};
	}, []);

	return (
		<Root>
			<Controls />

			<Header>Use Filters</Header>

			<main>
				{image64 && <ImagePreview image64={image64} />}

				{!image64 && <UploadImage fileReader={fileReader.current} />}
			</main>

			<HorizontalScroll as="aside">
				<Outlet />
			</HorizontalScroll>
		</Root>
	);
};

export default MainView;
