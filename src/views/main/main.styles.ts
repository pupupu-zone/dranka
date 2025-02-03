import styled from 'styled-components';

export const Header = styled.h1`
	color: var(--text-color);
	font-weight: 200;
	font-size: 36px;
	opacity: 0.6;

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

export const Headers = styled.header`
	width: 100%;
`;

export const Aside = styled.aside`
	width: 20vw;
	height: 128px;
	background-color: var(--accent);
`;

export const Main = styled.main`
	display: flex;
	justify-content: center;
	width: 100%;
`;

export default styled.div`
	display: grid;
	grid-auto-rows: min-content min-content;
	grid-auto-columns: calc(100vw - 48px);
	grid-auto-flow: row;
	gap: 24px;
	margin-top: calc(env(safe-area-inset-top) + 24px);
	margin-right: 24px;
	margin-left: 24px;
`;
