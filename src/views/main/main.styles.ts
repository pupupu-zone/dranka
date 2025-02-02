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

export const Headers = styled.header`
	display: flex;
	grid-area: header;
	gap: 18px;
	justify-content: flex-start;
`;

export const Aside = styled.aside`
	grid-area: sidebar;
	width: 20vw;
	height: 128px;
	background-color: var(--accent);
`;

export const Main = styled.main`
	display: flex;
	grid-area: main;
	justify-content: center;
`;

export default styled.div`
	display: grid;
	grid-template:
		'header' min-content
		'main' min-content
		/ 1fr;
	gap: 24px;
	margin-top: calc(env(safe-area-inset-top) + 24px);
	margin-right: 24px;
	margin-left: 24px;
`;
