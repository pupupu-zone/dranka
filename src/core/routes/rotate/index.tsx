import { createFileRoute } from '@tanstack/react-router';

import RotateView from '@views/rotate';

export const Route = createFileRoute('/rotate/')({
	component: RotateView
});
