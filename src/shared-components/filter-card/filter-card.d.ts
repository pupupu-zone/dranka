import type { ActionT } from '@store/types';

export type Props = {
	effectId: ActionT['action_id'];
	label: string;
	isActive: boolean;
};
