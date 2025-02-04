import React, { useState, useEffect, useContext } from 'react';
import { useDebounce } from 'use-debounce';

import MainContext from '@views/context';

import { Icon } from '@ui';
import {
	Button as AriaButton,
	Slider as AriaSlider,
	SliderThumb as AriaThumb,
	SliderTrack as AriaTrack
} from 'react-aria-components';
import Root, { InnerRoot, OkBtn, Slider, Track, Thumb, Info } from './strength-slider.styles';

const useStrengthValue = (): [number, (next: number) => void] => {
	const { strengths, activeSlider, setStrengths } = useContext(MainContext);
	const [innerValue, setInnerValue] = useState(strengths[activeSlider] || 100);
	const [value] = useDebounce(innerValue, 500);

	useEffect(() => {
		if (!activeSlider) return;

		setStrengths(activeSlider, value);
	}, [value]);

	useEffect(() => {
		if (!activeSlider) return;

		setInnerValue(strengths[activeSlider] || 100);
	}, [activeSlider]);

	return [innerValue, setInnerValue];
};

const StrengthSlider = (props: Record<string, unknown>) => {
	const [value, setValue] = useStrengthValue();
	const { activeSlider, setActiveSlider } = useContext(MainContext);
	const maxValue = activeSlider === 'blur' ? 30 : 100;
	const step = activeSlider === 'blur' ? 1 : 5;

	const onChangeHd = (nextValue: number | number[]) => {
		const valueToSet = Array.isArray(nextValue) ? nextValue[0] : nextValue;

		setValue(valueToSet);
	};

	const closeHd = () => {
		setActiveSlider('');
	};

	return (
		<Root {...props}>
			<InnerRoot>
				<Info>{value}</Info>

				<Slider as={AriaSlider} value={value} onChange={onChangeHd} minValue={0} maxValue={maxValue} step={step}>
					<Track as={AriaTrack}>
						<Thumb as={AriaThumb} />
					</Track>
				</Slider>

				<OkBtn as={AriaButton} onPress={closeHd}>
					<Icon name="check" />
				</OkBtn>
			</InnerRoot>
		</Root>
	);
};

export default React.memo(StrengthSlider);
