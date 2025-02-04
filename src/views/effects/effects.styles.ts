import styled from 'styled-components';

export const SliderRoot = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	width: 100%;
`;

export default styled.div`
	position: fixed;
	bottom: 0;
	left: 50%;
	display: grid;
	grid-auto-flow: dense;
	gap: 24px;
	width: 100vw;
	transform: translateX(-50%);
`;
