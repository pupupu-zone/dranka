import mimeTypes from 'mime-types';

const DEFAULT_MIME = 'image/webp';

const getMimeType = (dataUrl: string) => {
	const matches = dataUrl.match(/^data:([^;]+);/);

	return matches ? matches[1] : DEFAULT_MIME;
};

const saveBase64 = (base64String: string, filename: string) => {
	if (!base64String.startsWith('data:')) {
		return null;
	}

	const img = new Image();
	const mime = getMimeType(base64String);
	const extension = mimeTypes.extension(mime);

	const promise = new Promise((resolve, reject) => {
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
					if (!blob) return;

					const url = URL.createObjectURL(blob);
					const link = document.createElement('a');
					link.href = url;
					link.download = `${filename || 'image'}.${extension}`;
					document.body.appendChild(link);
					link.click();

					document.body.removeChild(link);
					URL.revokeObjectURL(url);
					resolve(true);
				}, mime);
			} catch (error) {
				reject(error);
			}
		};

		img.onerror = (error) => reject(error);
		img.src = base64String;
	});

	return promise;
};

export default saveBase64;
