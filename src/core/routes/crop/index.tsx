import { createFileRoute } from '@tanstack/react-router';

import CropView from '@views/crop';

export const Route = createFileRoute('/crop/')({
	component: CropView
});
