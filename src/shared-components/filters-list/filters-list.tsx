import React from 'react';

import { HorizontalScroll } from '@ui';
import Root, { Scroll, InnerList } from './filters-list.styles';

import type { Props } from './filters-list.d';

const FiltersList = ({ children }: Props) => {
	if (!children) {
		return null;
	}

	return (
		<Root>
			<HorizontalScroll as={Scroll}>
				<InnerList>{children}</InnerList>
			</HorizontalScroll>
		</Root>
	);
};

export default FiltersList;
