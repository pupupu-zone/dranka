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

export const Card = styled.button`
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

export const FiltersList = styled.div`
	display: grid;
	grid-auto-flow: column;
	gap: 18px;
	justify-content: center;
	min-width: 100vw;

	/* compensation for 2px of paddings in hor scroll, so no wobling */
	min-width: calc(100vw - 36px);
`;

export const Scroll = styled.div`
	padding-right: 18px;
	padding-left: 18px;
`;

export default styled.div`
	position: fixed;
	bottom: 0;
	left: 50%;
	width: 100vw;
	padding: 18px 0;
	background-color: #5f5f5f60;
	transform: translateX(-50%);
	backdrop-filter: blur(2px);
`;
