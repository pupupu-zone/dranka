import { createFileRoute } from '@tanstack/react-router';

import EffectsView from '@views/effects';

export const Route = createFileRoute('/effects/')({
	component: EffectsView
});
