import React, { useContext } from 'react';

import previewImg from '@images/preview.jpg';
import MainContext from '@views/context';

import { HorizontalScroll } from '@ui';
import { Button as AriaButton } from 'react-aria-components';
import Root, { Scroll, Card, Label, Preview, Img, FiltersList } from './filters.styles';

const FILTERS = [
	{
		id: 'original',
		label: 'Original'
	},
	{
		id: 'grayscale',
		label: 'Grayscale'
	},
	{
		id: 'invert',
		label: 'Invert'
	},
	{
		id: 'sepia',
		label: 'Sepia'
	},
	{
		id: 'blur',
		label: 'Blur'
	}
];

const FilterActions = () => {
	const { isBarHidden, image64, setAction } = useContext(MainContext);

	if (!image64 || isBarHidden) {
		return null;
	}

	return (
		<Root>
			<HorizontalScroll as={Scroll}>
				<FiltersList>
					{FILTERS.map((filter) => (
						<Card key={filter.id} as={AriaButton} onPress={() => setAction(filter.id)}>
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
