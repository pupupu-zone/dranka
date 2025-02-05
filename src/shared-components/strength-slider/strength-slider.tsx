import React, { useState, useEffect, useMemo, useContext } from 'react';
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

const StrengthSlider = (props: Record<string, unknown>) => {
	const { actions, setSliderActive, updateAction } = useContext(MainContext);
	const action = useMemo(() => actions.find(({ is_slider_active }) => is_slider_active), [actions]);
	const actionId = action?.action_id || '';
	const [innerValue, setInnerValue] = useState<number>(0);
	const [value] = useDebounce(innerValue, 500);

	useEffect(() => {
		setInnerValue(action?.weight);
	}, [actionId]);

	useEffect(() => {
		updateAction({ action_id: actionId, weight: value });
	}, [value]);

	const maxValue = actionId === 'blur' ? 30 : 100;
	const step = actionId === 'blur' ? 1 : 5;

	const onChangeHd = (nextValue: number | number[]) => {
		const valueToSet = Array.isArray(nextValue) ? nextValue[0] : nextValue;

		setInnerValue(valueToSet);
	};

	const closeHd = () => {
		setSliderActive(actionId, false);
	};

	return (
		<Root {...props}>
			<InnerRoot>
				<Info>{innerValue}</Info>

				<Slider as={AriaSlider} value={innerValue} onChange={onChangeHd} minValue={0} maxValue={maxValue} step={step}>
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
