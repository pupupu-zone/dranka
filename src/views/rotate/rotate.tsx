import React from 'react';
import { useUnit } from 'effector-react';

import { $images } from '@store';

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
	const { preview64 } = useUnit($images);

	if (!preview64) {
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
