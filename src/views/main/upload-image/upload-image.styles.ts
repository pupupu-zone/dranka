import styled from 'styled-components';

export const UploadText = styled.h3`
	margin-top: 16px;
	font-size: 28px;
`;

export const ImageSelector = styled.input`
	position: absolute;
	inset: 0;
`;

export default styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	aspect-ratio: 3 / 4;
	max-height: 70vh;
	color: var(--controls-bg);
	background-color: transparent;
	border: 2px dashed var(--controls-bg);
	border-radius: 18px;
	cursor: pointer;
	transition:
		border-color 150ms,
		color 150ms,
		opacity 150ms;

	&:hover {
		color: var(--accent);
		border-color: var(--accent);
		opacity: 1;
	}

	&:focus-visible {
		box-shadow: none;
	}
`;
