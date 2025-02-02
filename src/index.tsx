import React from 'react';
import ReactDOM from 'react-dom/client';

import { routeTree } from './routeTree.gen';
import { createRouter } from '@tanstack/react-router';

import RootApp from '@core/Root.tsx';
import initWASM from '@wasm/dranka';

await initWASM();

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

if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);

	root.render(<RootApp router={router} />);
}
