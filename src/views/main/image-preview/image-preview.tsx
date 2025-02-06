import React, { useEffect, useRef } from 'react';
import { useUnit } from 'effector-react';

import { $images } from '@store';

import Root, { Canvas } from './image-preview.styles';

const ImagePreview = () => {
	const { preview64 } = useUnit($images);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if (!preview64) return;

		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const image = new Image();

		image.onload = () => {
			canvas.width = image.width;
			canvas.height = image.height;

			ctx.drawImage(image, 0, 0);
		};

		image.onerror = (err) => {
			console.error('Error loading image:', err);
			ctx.fillStyle = 'red';
			ctx.font = '14px Arial';
			ctx.fillText('Error', 10, 50);
		};

		image.src = preview64;
	}, [canvasRef, preview64]);

	return (
		<Root>
			<Canvas ref={canvasRef} />
		</Root>
	);
};

export default ImagePreview;
