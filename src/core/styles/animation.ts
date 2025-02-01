import { css, keyframes } from 'styled-components';

export const hoverAnimation = css`
	transition-timing-function: cubic-bezier(0.45, 0, 0.55, 1);
	transition-duration: 0.15s;
`;

export const rotateAnimation = keyframes`
	100% {
		transform: rotate(360deg);
	}
`;
