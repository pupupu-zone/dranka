import React, { useContext } from 'react';

import MainContext from '@views/context';

import ActionCard from '@shared/action-card';
import FiltersList from '@shared/filters-list';
import Root from './rotate.styles';

type ActionType = 'reset' | 'action' | 'fast-action';

const ACTIONS: { id: string; label: string; type: ActionType }[] = [
	{
		id: 'rotate-left',
		label: 'Left',
		type: 'fast-action'
	},
	{
		id: 'rotate-right',
		label: 'Right',
		type: 'fast-action'
	},
	{
		id: 'mirror-horizontal',
		label: 'Mirror H',
		type: 'fast-action'
	},
	{
		id: 'mirror-vertical',
		label: 'Mirror V',
		type: 'fast-action'
	}
];

const RotateActions = () => {
	const { originalImage64 } = useContext(MainContext);

	if (!originalImage64) {
		return null;
	}

	return (
		<Root>
			<FiltersList>
				{ACTIONS.map((action) => (
					<ActionCard key={action.id} actionId={action.id} label={action.label} type={action.type} />
				))}
			</FiltersList>
		</Root>
	);
};

export default RotateActions;
