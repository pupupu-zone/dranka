import React from 'react';

export type Props = React.PropsWithChildren<{
	title?: string;
	isOpen: boolean;
	openModal: () => void;
	closeModal: () => void;
}>;
