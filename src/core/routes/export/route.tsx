import { createFileRoute } from '@tanstack/react-router';
import MainView from '@views/main';

export const Route = createFileRoute('/export')({
	component: MainView
});
