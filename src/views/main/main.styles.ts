import styled from 'styled-components';

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
