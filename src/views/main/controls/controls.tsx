import React from 'react';

import { Icon } from '@ui';
import { Link } from '@tanstack/react-router';
import Root, { NavItem } from './controls.styles';

const Controls = () => (
	<Root>
		<NavItem as={Link} to="/filters" activeProps={{ className: 'active' }}>
			<Icon name="filters" />
		</NavItem>

		<NavItem as={Link} to="/crop" activeProps={{ className: 'active' }} disabled>
			<Icon name="crop" />
		</NavItem>

		<NavItem as={Link} to="/merge" activeProps={{ className: 'active' }} disabled>
			<Icon name="merge" />
		</NavItem>
	</Root>
);

export default Controls;
