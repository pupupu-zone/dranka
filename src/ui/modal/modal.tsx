import React from 'react';
import { createPortal } from 'react-dom';

import { H1 } from '../typography';
import Root, { Content, Backdrop } from './modal.styles';

import type { Props } from './modal.d';

const Portal = ({ children }: React.PropsWithChildren<unknown>) => {
	return createPortal(children, document.getElementById('modal')!);
};

const Modal = ({ title, children, closeModal, isOpen }: Props) => {
	if (!isOpen) return null;

	return (
		<Portal>
			<Root>
				<Backdrop onClick={closeModal} />

				<Content>
					{title && <H1 $weight={500}>{title}</H1>}

					{children}
				</Content>
			</Root>
		</Portal>
	);
};

export default Modal;
