import React, { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';

import { Slider as AriaSlider, SliderThumb as AriaThumb, SliderTrack as AriaTrack } from 'react-aria-components';
import Root, { Title, Slider, Track, Thumb, Info } from './slider.styles';

const SliderBw = ({ externalValue, onChange }) => {
	const [value, setValue] = useState<number>(externalValue);
	const [nextValue] = useDebounce(value, 500);

	useEffect(() => {
		onChange(nextValue);
	}, [nextValue]);

	const onChangeHd = (val: number | number[]) => {
		setValue(Array.isArray(val) ? val[0] : val);
	};

	return (
		<Root>
			<Title>Grayscale</Title>

			<Info>{value}</Info>
			<Slider as={AriaSlider} value={value} onChange={onChangeHd} minValue={0} maxValue={100} step={5}>
				<Track as={AriaTrack}>
					<Thumb as={AriaThumb} />
				</Track>
			</Slider>
		</Root>
	);
};

export default SliderBw;
