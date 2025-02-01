import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button as AriaButton } from 'react-aria-components';

import Root from './button.styles';

import type { Props } from './button.d';

const noop = () => {};

const Button = React.forwardRef(
	(
		{
			children,
			to,
			isFullWidth = false,
			isSecondary = false,
			isGlowing = false,
			onPress = noop,
			variant = 'primary',
			size = 'medium',
			...restProps
		}: Props,
		ref
	) => {
		const navigate = useNavigate();

		const onPressHd = (e: React.ChangeEvent<HTMLInputElement>) => {
			if (to) {
				navigate({ to });
			}

			onPress(e);
		};

		return (
			<Root
				as={AriaButton}
				ref={ref}
				$variant={variant}
				$size={size}
				$isFullWidth={isFullWidth}
				$isSecondary={isSecondary}
				$isGlowing={isGlowing}
				onPress={onPressHd}
				{...restProps}
			>
				{children}
			</Root>
		);
	}
);

export default Button;
