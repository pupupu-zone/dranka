import React from 'react';
import ReactDOM from 'react-dom/client';

import { routeTree } from './routeTree.gen';
import { createRouter } from '@tanstack/react-router';

import RootApp from '@core/Root.tsx';
import * as masks from '@src/assets/masks';

// Set up a Router instance
const router = createRouter({
	routeTree
});

// Register things for typesafety
declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

export type AppRouter = typeof router;

const rootElement = document.getElementById('root')!;
const masksElement = document.getElementById('masks')!;

if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);

	root.render(<RootApp router={router} />);
}

if (!masksElement.innerHTML) {
	const masksNode = ReactDOM.createRoot(masksElement);

	masksNode.render(
		<>
			<masks.SquircleMask />
		</>
	);
}
