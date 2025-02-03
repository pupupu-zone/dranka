import styled from 'styled-components';

export const SliderWrap = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	justify-self: center;
	width: 320px;
	margin-top: 24px;
	margin-bottom: 24px;
	background-color: #5f5f5f60;
	border-radius: 18px;

	margin: 0;

	margin-bottom: 24px;
	height: 48px;
	padding: 24px;
	border-radius: 18px;
	height: auto;
`;

export default styled.div`
	position: fixed;
	bottom: 0;
	left: 50%;
	width: 100vw;
	transform: translateX(-50%);
	backdrop-filter: blur(2px);
`;

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

export const Test = styled.div`
	padding: 18px 0;
	background-color: #5f5f5f60;
`;
