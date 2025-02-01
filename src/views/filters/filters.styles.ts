import styled from 'styled-components';

export const FilterCard = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 200px;
	aspect-ratio: 3 / 2;
	margin: 0;
	padding: 0;
	font-size: 24px;
	background-color: #f0f0f0;
	border: none;
	border-radius: 18px;
	transform: scale(0.98);
	cursor: pointer;
	transition: all 150ms ease-in-out;

	&:hover {
		background-color: #e0e0e0;
		transform: scale(1);
	}

	&[data-pressed='true'] {
		background-color: #d0d0d0;
		transform: scale(0.96);
	}
`;

export default styled.div`
	display: grid;
	grid-auto-columns: min-content;
	grid-auto-flow: column;
	gap: 24px;
`;
