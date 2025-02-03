import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
	beforeLoad: () => {
		throw redirect({ to: '/bw' });
	},
	component: Outlet
});
