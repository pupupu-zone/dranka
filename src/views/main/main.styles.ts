import styled from 'styled-components';

export const Header = styled.header`
	color: var(--text-color);
	font-weight: 200;
	font-size: 36px;
`;

export const Main = styled.main``;

export default styled.div`
	display: grid;
	grid-auto-rows: min-content;
	grid-auto-flow: row;
	gap: 24px;
	margin-top: 48px;
	margin-right: 24px;
	margin-left: 128px;
`;
