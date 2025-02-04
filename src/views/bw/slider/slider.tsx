import React, { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';

import { Icon } from '@ui';
import {
	Button as AriaButton,
	Slider as AriaSlider,
	SliderThumb as AriaThumb,
	SliderTrack as AriaTrack
} from 'react-aria-components';
import Root, { OkBtn, Slider, Track, Thumb, Info } from './slider.styles';

const SliderBw = ({ externalValue, onChange, close }) => {
	const [value, setValue] = useState<number>(externalValue);
	const [nextValue] = useDebounce(value, 500);

	useEffect(() => {
		onChange(nextValue);
	}, [nextValue]);

	const onChangeHd = (val: number | number[]) => {
		setValue(Array.isArray(val) ? val[0] : val);
	};

	const closeHd = () => {
		close();
	};

	return (
		<Root>
			<Info>{value}</Info>
			<Slider as={AriaSlider} value={value} onChange={onChangeHd} minValue={0} maxValue={100} step={5}>
				<Track as={AriaTrack}>
					<Thumb as={AriaThumb} />
				</Track>
			</Slider>
			<OkBtn as={AriaButton} onPress={closeHd}>
				<Icon name="check" />
			</OkBtn>
		</Root>
	);
};

export default SliderBw;
