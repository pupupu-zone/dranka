import React, { useRef, useState, useEffect } from 'react';
import { Link, Outlet } from '@tanstack/react-router';

import { grayscale } from '@wasm/dranka';

import UploadImage from './upload-image';
import ImagePreview from './image-preview';
import Root, { Headers, Header, Main } from './main.styles';

const MainView = () => {
	const fileReader = useRef(new FileReader());
	const [imageToView, setImageToView] = useState('');
	const [image64, setImage64] = useState('');

	useEffect(() => {
		fileReader.current.onloadend = () => {
			const result = fileReader.current.result as string;

			setImage64(result);
			setImageToView(result);
		};
	}, []);

	useEffect(() => {
		const grayImage64 = grayscale(image64, 1);

		setImageToView(grayImage64);
	}, [image64]);

	return (
		<Root>
			<Headers>
				<Header as={Link} to="/filters" activeProps={{ className: 'active' }}>
					Filters
				</Header>

				<Header as={Link} to="/crop" activeProps={{ className: 'active' }}>
					Crop
				</Header>

				<Header as={Link} to="/merge" activeProps={{ className: 'active' }} disabled>
					Merge
				</Header>
			</Headers>

			<Main>
				{image64 && <ImagePreview image64={imageToView} />}

				{!image64 && <UploadImage fileReader={fileReader.current} />}
			</Main>

			<Outlet />
		</Root>
	);
};

export default MainView;
