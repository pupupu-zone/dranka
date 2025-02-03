import React, { useState, useRef, useEffect } from 'react';
import { Link, Outlet } from '@tanstack/react-router';

import MainContext from '@views/context';
import { grayscale, invert, sepia, blur, minify_image } from '@wasm/dranka';

import { HorizontalScroll } from '@ui';
import UploadImage from './upload-image';
import ImagePreview from './image-preview';
import Root, { Headers, Header, HeadersInner, Main } from './main.styles';

const MainView = () => {
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
	}, [filters, compressedImage64]);

	const applyFilters = (filters: string[], imageToModify: string) => {
		let modifiedImage = imageToModify;

		if (filters.includes('grayscale')) {
			const grayImage64 = grayscale(modifiedImage, 1);

			modifiedImage = grayImage64;
		}

		if (filters.includes('invert')) {
			const invertImage = invert(modifiedImage);

			modifiedImage = invertImage;
		}

		if (filters.includes('sepia')) {
			const sepiaImage = sepia(modifiedImage, 1);

			modifiedImage = sepiaImage;
		}

		if (filters.includes('blur')) {
			const blurImage = blur(modifiedImage, 10);

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
				applyFilters
			}}
		>
			<Root>
				<Headers>
					<HorizontalScroll>
						<HeadersInner>
							<Header as={Link} to="/bw" activeProps={{ className: 'active' }}>
								B&W
							</Header>

							<Header as={Link} to="/effects" activeProps={{ className: 'active' }}>
								Effects
							</Header>

							<Header as={Link} to="/export" activeProps={{ className: 'active' }}>
								Export
							</Header>
						</HeadersInner>
					</HorizontalScroll>
				</Headers>

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
