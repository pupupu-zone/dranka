import { createFileRoute } from '@tanstack/react-router';

import BWView from '@views/bw';

export const Route = createFileRoute('/bw/')({
	component: BWView
});
