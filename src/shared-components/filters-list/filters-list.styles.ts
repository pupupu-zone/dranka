import styled from 'styled-components';

export const InnerList = styled.div`
	display: grid;
	grid-auto-flow: column;
	gap: 18px;
	justify-content: center;
	min-width: 100vw;

	/* compensation for 2px of paddings in hor scroll, so no wobling */
	min-width: calc(100vw - 36px);
`;

export const Scroll = styled.div`
	padding-right: 18px;
	padding-left: 18px;
`;

export default styled.div`
	padding: 18px 0;
	background-color: #5f5f5f80;
	backdrop-filter: blur(2px);
`;
