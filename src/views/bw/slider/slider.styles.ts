import styled from 'styled-components';

export const Slider = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	width: 100%;
	color: white;
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
	font-size: 12px;
	color: var(--accent);
`;

export default styled.div`
	display: grid;
	grid-auto-flow: column;
	grid-auto-columns: 24px 1fr;
	align-items: center;
	gap: 24px;
	width: 100%;
`;
