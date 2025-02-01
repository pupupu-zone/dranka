import { createFileRoute } from '@tanstack/react-router';

import FiltersView from '@views/filters';

export const Route = createFileRoute('/filters/')({
	component: FiltersView
});
