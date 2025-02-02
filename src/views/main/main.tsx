import React, { useState, useRef, useEffect } from 'react';
import { Link, Outlet } from '@tanstack/react-router';

import MainContext from '@views/context';
import { grayscale, invert, sepia, blur } from '@wasm/dranka';

import UploadImage from './upload-image';
import ImagePreview from './image-preview';
import Root, { Headers, Header, Main } from './main.styles';

const MainView = () => {
	const [action, setAction] = useState('');
	const [isBarHidden, setIsBarHidden] = useState(false);

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
		if (action === 'original') {
			setImageToView(image64);
		}

		if (action === 'grayscale') {
			const grayImage64 = grayscale(image64, 1);

			setImageToView(grayImage64);
		}

		if (action === 'invert') {
			const invertImage = invert(image64);

			setImageToView(invertImage);
		}

		if (action === 'sepia') {
			const sepiaImage = sepia(image64);

			setImageToView(sepiaImage);
		}

		if (action === 'blur') {
			const blurImage = blur(image64, 10);

			setImageToView(blurImage);
		}
	}, [action, image64]);

	const toggleBar = () => setIsBarHidden(image64 ? !isBarHidden : false);

	return (
		<MainContext.Provider value={{ image64, isBarHidden, setAction, action }}>
			<Root>
				<Headers>
					<Header as={Link} to="/filters" activeProps={{ className: 'active' }} onClick={toggleBar}>
						Filters
					</Header>

					<Header as={Link} to="/crop" activeProps={{ className: 'active' }} onClick={toggleBar}>
						Crop
					</Header>

					<Header as={Link} to="/merge" activeProps={{ className: 'active' }} onClick={toggleBar} disabled>
						Merge
					</Header>
				</Headers>

				<Main>
					{image64 && <ImagePreview image64={imageToView} />}

					{!image64 && <UploadImage fileReader={fileReader.current} />}
				</Main>

				<Outlet />
			</Root>
		</MainContext.Provider>
	);
};

export default MainView;
