import styled from 'styled-components';

export const Header = styled.h1`
	color: var(--text-color);
	font-weight: 200;
	font-size: 36px;
	opacity: 0.6;

	&[aria-disabled='true'] {
		cursor: not-allowed;
		opacity: 0.3;
	}

	&.active {
		opacity: 1;
	}
`;

export const HeadersInner = styled.p`
	display: grid;
	grid-auto-flow: column;
	gap: 18px;
	justify-content: flex-start;
`;

export default styled.header`
	width: 100%;
`;
