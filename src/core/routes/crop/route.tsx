import { createFileRoute } from '@tanstack/react-router';
import MainView from '@views/main';

export const Route = createFileRoute('/crop')({
	component: MainView
});
