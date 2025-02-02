import React from 'react';

import previewImg from '@images/preview.jpg';
import { HorizontalScroll } from '@ui';
import { Button as AriaButton } from 'react-aria-components';
import Root, { Scroll, Card, Label, Preview, Img, FiltersList } from './filters.styles';

const FILTERS = [
	{
		id: 'grayscale',
		label: 'Grayscale',
		defaultValue: 50
	},
	{
		id: 'invert',
		label: 'Invert',
		defaultValue: 75
	},
	{
		id: 'sepia',
		label: 'Sepia',
		defaultValue: 25
	},
	{
		id: 'blur',
		label: 'Blur',
		defaultValue: 25
	},
	{
		id: 'hue',
		label: 'Hue',
		defaultValue: 25
	}
];

const FilterActions = () => {
	return (
		<Root>
			<HorizontalScroll as={Scroll}>
				<FiltersList>
					{FILTERS.map((filter) => (
						<Card key={filter.id} as={AriaButton}>
							<Preview>
								<Img src={previewImg} alt="Preview" $effect={filter.id} />
							</Preview>

							<Label>{filter.label}</Label>
						</Card>
					))}
				</FiltersList>
			</HorizontalScroll>
		</Root>
	);
};

export default FilterActions;
