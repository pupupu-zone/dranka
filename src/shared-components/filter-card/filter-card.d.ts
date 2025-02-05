import type { ActionT } from '@views/context';

export type Props = {
	effectId: ActionT['action_id'];
	label: string;
	isActive: boolean;
};
