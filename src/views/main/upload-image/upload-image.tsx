import React, { useRef } from 'react';

import { ImageLoadIcon } from '@images';
import { Button as AriaButton } from 'react-aria-components';
import Root, { ImageSelector, UploadText } from './upload-image.styles';

import type { Props } from './upload-image.d';

const UploadImage = ({ fileReader }: Props) => {
	const imageRef = useRef<HTMLInputElement>(null);

	const loadImageHd = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files || [];

		fileReader.readAsDataURL(files[0]);
	};

	const openImageDialog = () => {
		imageRef.current?.click();
	};

	return (
		<Root as={AriaButton} onPress={openImageDialog}>
			<ImageSelector ref={imageRef} type="file" hidden onChange={loadImageHd} accept="image/*" />

			<ImageLoadIcon width={128} />

			<UploadText>Upload Image</UploadText>
		</Root>
	);
};

export default UploadImage;
