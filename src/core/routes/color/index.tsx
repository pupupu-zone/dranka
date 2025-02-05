import { createFileRoute } from '@tanstack/react-router';

import ColorView from '@views/color';

export const Route = createFileRoute('/color/')({
	component: ColorView
});
