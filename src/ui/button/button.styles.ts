import styled, { css } from 'styled-components';

import type { StyleProps } from './button.d';

const variants = {
	faded: {
		default: css``,
		secondary: css``
	},
	primary: {
		default: css`
			color: var(--primary-button-text);
			background-color: oklch(var(--primary-button) / 1);

			&:active,
			&:focus-visible,
			&:target,
			&[data-pressed] {
				background-color: oklch(var(--primary-button-press) / 1);
			}

			&:hover {
				background-color: oklch(var(--primary-button-hover) / 1);
				box-shadow: 0 4px 28px rgba(77 112 245 / 0.22);
			}
		`,
		secondary: css`
			color: oklch(var(--primary-button) / 1);
			background-color: var(--primary-button-text);
			border: 1px solid oklch(var(--primary-button) / 1);

			&:active,
			&[data-pressed] {
				background-color: oklch(var(--primary-button-press) / 0.15);
			}

			&:hover {
				background-color: oklch(var(--primary-button-hover) / 0.15);
				box-shadow: 0 4px 28px rgba(77 112 245 / 0.12);
			}
		`
	}
};

const sizes = {
	medium: css`
		padding: 12px 24px;
		font-size: 18px;
		line-height: 1.2;
	`
};

const fullWidth = css`
	width: 100%;
`;

const fitWidth = css`
	width: fit-content;
`;

const gloving = css`
	box-shadow: 0 2px 20px 8px rgba(255, 255, 255, 0.1);
`;

export default styled.button<StyleProps>`
	display: inline-flex;
	justify-content: center;
	font-weight: 500;
	font-family: 'Nunito Sans', sans-serif;
	border: none;
	border-radius: 12px;
	cursor: pointer;
	transition-timing-function: ease-out;
	transition-duration: 0.15s;
	transition-property: background-color, transform, box-shadow;

	&[data-pressed] {
		transform: scale(0.97);
	}

	&[data-disabled] {
		cursor: not-allowed;
		opacity: 0.66;
		pointer-events: none;
	}

	${({ $variant, $isSecondary }) => {
		const key = $isSecondary ? 'secondary' : 'default';

		return variants[$variant || 'primary'][key];
	}}
	${({ $size }) => sizes[$size || 'medium']}
	${({ $isFullWidth }) => ($isFullWidth ? fullWidth : fitWidth)}
	${({ $isGlowing }) => ($isGlowing ? gloving : '')}
`;
