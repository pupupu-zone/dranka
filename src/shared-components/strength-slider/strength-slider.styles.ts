import styled from 'styled-components';

export const Thumb = styled.div`
	width: 24px;
	height: 24px;
	background-color: var(--text-color);
	border-radius: 50%;
	cursor: pointer;

	&[data-dragging] {
		background-color: var(--accent);
	}

	&[data-focus-visible] {
		box-shadow: 0 0 0 3px oklch(var(--blue-focus) / 0.5);
	}
`;

export const Track = styled.div`
	position: relative;
	height: 2px;
	background-color: var(--text-color);
	border-radius: 2px;
`;

export const Slider = styled.div`
	display: grid;
	width: 100%;
`;

export const Info = styled.div`
	color: var(--text-color);
	font-size: 12px;
`;

export const OkBtn = styled.button`
	display: grid;
	width: 24px;
	height: 24px;
	margin: 0;
	padding: 0;
	color: var(--text-color);
	background-color: transparent;
	border: none;
	cursor: pointer;
`;

export const InnerRoot = styled.div`
	display: grid;
	grid-auto-columns: 24px 1fr 24px;
	grid-auto-flow: column;
	gap: 24px;
	align-items: center;
	width: 100%;
`;

export default styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	justify-self: center;
	width: 320px;
	height: auto;
	margin: 0;
	padding: 24px;
	background-color: #5f5f5f90;
	border-radius: 18px;
	backdrop-filter: blur(2px);
`;
