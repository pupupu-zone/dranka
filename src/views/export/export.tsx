import React, { useContext } from 'react';
import mimeTypes from 'mime-types';
import MainContext from '@views/context';

import { Button as AriaButton } from 'react-aria-components';
import Root, { Button } from './export.styles';

function getMimeType(dataUrl: string) {
	if (!dataUrl.startsWith('data:')) {
		return null;
	}

	const matches = dataUrl.match(/^data:([^;]+);/);
	return matches ? matches[1] : null;
}

function saveBase64AsImageWithCanvas(base64String: string, filename: string) {
	const img = new Image();
	const mime = getMimeType(base64String);
	const extension = mimeTypes.extension(mime) || 'webp';

	return new Promise((resolve, reject) => {
		img.onload = () => {
			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('2d');

			if (!ctx) {
				return;
			}

			canvas.width = img.width;
			canvas.height = img.height;

			ctx.drawImage(img, 0, 0);

			try {
				canvas.toBlob((blob) => {
					const url = URL.createObjectURL(blob);
					const link = document.createElement('a');
					link.href = url;
					link.download = `${filename || 'image'}.${extension}`;
					document.body.appendChild(link);
					link.click();

					document.body.removeChild(link);
					URL.revokeObjectURL(url);
					resolve(true);
				}, mime || 'image/webp');
			} catch (error) {
				reject(error);
			}
		};

		img.onerror = (error) => reject(error);

		// Set image source - handle both data URL and raw base64
		if (!base64String.startsWith('data:')) {
			base64String = 'data:image/png;base64,' + base64String;
		}
		img.src = base64String;
	});
}

const ExportView = () => {
	const { imageToView } = useContext(MainContext);

	const saveImage = () => {
		// here we shall send our image through all selected filters
		// and in the end we will receive base64 string, which we have to save.
		// canvas-preview component is just a preview — minified version of real image
		// here we proceed the actual image, so we can't use it to save our image
		saveBase64AsImageWithCanvas(imageToView, 'preview');
	};

	return (
		<Root>
			<Button as={AriaButton} onPress={saveImage}>
				Save as
			</Button>
		</Root>
	);
};

export default ExportView;
