import React from 'react';
import { Link } from '@tanstack/react-router';

import { HorizontalScroll } from '@ui';
import Root, { Header, HeadersInner } from './navigation.styles';

const Navigation = () => {
	return (
		<Root>
			<HorizontalScroll>
				<HeadersInner>
					<Header as={Link} to="/bw" activeProps={{ className: 'active' }}>
						B&W
					</Header>

					<Header as={Link} to="/color" activeProps={{ className: 'active' }}>
						Color
					</Header>

					<Header as={Link} to="/effects" activeProps={{ className: 'active' }}>
						Effects
					</Header>

					<Header as={Link} to="/rotate" activeProps={{ className: 'active' }}>
						Transform
					</Header>

					<Header as={Link} to="/crop" activeProps={{ className: 'active' }} disabled>
						Crop
					</Header>

					<Header as={Link} to="/export" activeProps={{ className: 'active' }}>
						Export
					</Header>
				</HeadersInner>
			</HorizontalScroll>
		</Root>
	);
};

export default React.memo(Navigation);
