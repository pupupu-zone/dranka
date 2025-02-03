import { createFileRoute } from '@tanstack/react-router';

import ExportView from '@views/export';

export const Route = createFileRoute('/export/')({
	component: ExportView
});
