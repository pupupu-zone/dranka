import React from 'react';
import { RouterProvider } from '@tanstack/react-router';

import { FontStyles, ResetStyles, GeneralStyles } from '@core/styles';

import type { AppRouter } from '@src/index.tsx';

type Props = {
	router: AppRouter;
};

const Root = ({ router }: Props) => {
	return (
		<>
			<ResetStyles />
			<FontStyles />
			<GeneralStyles />

			<RouterProvider router={router} />
		</>
	);
};

export default Root;
