import { createFileRoute } from '@tanstack/react-router';

import MergeView from '@views/merge';

export const Route = createFileRoute('/merge/')({
	component: MergeView
});
