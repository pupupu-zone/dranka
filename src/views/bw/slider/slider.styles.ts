import styled from 'styled-components';

export const Slider = styled.div`
	display: grid;
	grid-area: slider;
	grid-template-columns: 1fr;
	width: 100%;
	color: white;
`;

export const Title = styled.span`
	grid-area: title;
	color: var(--text-color);
	font-size: 14px;
`;

export const Track = styled.div`
	position: relative;
	height: 2px;
	background-color: var(--accent);
	border-radius: 2px;
`;

export const Thumb = styled.div`
	width: 24px;
	height: 24px;
	background-color: var(--accent);
	border-radius: 50%;
	cursor: pointer;

	&[data-dragging] {
		background-color: var(--accent-yellow);
	}

	&[data-focus-visible] {
		box-shadow: 0 0 0 3px oklch(var(--blue-focus) / 0.5);
	}
`;

export const Info = styled.div`
	grid-area: info;
	color: var(--accent);
	font-size: 12px;
`;

export default styled.div`
	display: grid;
	grid-auto-columns: 24px 1fr;
	grid-auto-flow: column;
	grid-template-areas:
		'title title'
		'info slider';
	gap: 24px;
	align-items: center;
	width: 100%;
`;
