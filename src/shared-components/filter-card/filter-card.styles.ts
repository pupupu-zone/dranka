import styled from 'styled-components';

export const Label = styled.label`
	color: var(--text-color);
	font-weight: 500;
	font-size: 14px;
	font-variant-caps: all-petite-caps;
`;

export const Preview = styled.div`
	width: 72px;
	height: 72px;
	overflow: hidden;
	border-radius: 8px;
`;

export const Img = styled.img<{ $effect: string }>`
	--grayscale: grayscale(1);
	--invert: invert(1);
	--sepia: sepia(1);
	--blur: blur(2px);
	--hue: hue-rotate(90deg);

	width: 100%;
	height: 100%;
	object-fit: cover;
	filter: ${({ $effect }) => `var(--${$effect})`};
`;

export default styled.button`
	display: flex;
	flex-direction: column;
	gap: 8px;
	align-items: center;
	margin: 0;
	padding: 0;
	background-color: transparent;
	border: none;
	cursor: pointer;
`;
