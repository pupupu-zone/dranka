import { useState } from 'react';

const useModal = () => {
	const [isOpen, setIsOpen] = useState(false);

	const openModal = () => {
		setIsOpen(true);
	};

	const closeModal = () => {
		window.setTimeout(() => setIsOpen(false), 0); // for future animation
	};

	return { isOpen, openModal, closeModal };
};

export default useModal;
