import React, { useContext } from 'react';

import MainContext from '@views/context';

import ActionCard from '@shared/action-card';
import FiltersList from '@shared/filters-list';
import Root from './rotate.styles';

const ACTIONS = [
	{ id: 'rotate-left', label: 'Left' },
	{ id: 'rotate-right', label: 'Right' },
	{ id: 'mirror-horizontal', label: 'Mirror H' },
	{ id: 'mirror-vertical', label: 'Mirror V' }
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
					<ActionCard key={action.id} actionId={action.id} label={action.label} />
				))}
			</FiltersList>
		</Root>
	);
};

export default RotateActions;
