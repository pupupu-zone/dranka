import styled from 'styled-components';

export const OkBtn = styled.button`
	display: grid;
	width: 24px;
	height: 24px;
	margin: 0;
	padding: 0;
	color: var(--accent);
	background-color: transparent;
	border: none;
	cursor: pointer;
`;

export const Slider = styled.div`
	display: grid;
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
		border: 4px solid var(--accent-yellow);
	}

	&[data-focus-visible] {
		box-shadow: 0 0 0 3px oklch(var(--blue-focus) / 0.5);
	}
`;

export const Info = styled.div`
	color: var(--accent);
	font-size: 12px;
`;

export default styled.div`
	display: grid;
	grid-auto-columns: 24px 1fr 24px;
	grid-auto-flow: column;
	gap: 24px;
	align-items: center;
	width: 100%;
`;
