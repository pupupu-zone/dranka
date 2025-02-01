import { useState, useEffect, useRef } from 'react';

const useBrokenImg = () => {
	const imageRef = useRef<HTMLImageElement>(null);
	const [isImageBroken, setIsImageBroken] = useState(false);
	const [isImageLoading, setIsImageLoading] = useState(true);

	useEffect(() => {
		if (!imageRef.current) return;

		imageRef.current.onerror = () => {
			setIsImageBroken(true);
		};

		imageRef.current.onload = () => {
			setIsImageLoading(false);
		};
	}, []);

	return { imageRef, isImageBroken, isImageLoading };
};

export default useBrokenImg;
