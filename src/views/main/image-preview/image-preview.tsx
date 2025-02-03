import React, { useEffect, useRef } from 'react';

import Root, { Canvas } from './image-preview.styles';
import type { Props } from './image-preview.d';

const ImagePreview = ({ image64 }: Props) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if (!image64) return;

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

		image.src = image64;
	}, [canvasRef, image64]);

	return (
		<Root>
			<Canvas ref={canvasRef} />
		</Root>
	);
};

export default ImagePreview;
