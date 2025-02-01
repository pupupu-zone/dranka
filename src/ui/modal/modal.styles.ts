import styled from 'styled-components';
import { animated } from '@react-spring/web';

export const Backdrop = styled(animated.div)`
	position: absolute;
	inset: 0;
	z-index: 9998;
	background-color: rgba(0 0 0 / 0.5);
	touch-action: none;
`;

export const Content = styled.div`
	position: relative;
	z-index: 10000;
	display: grid;
	grid-auto-flow: row;
	gap: 24px;
	width: 100%;
	min-height: 40vh;
	max-height: 100vh;
	padding: 20px;
	background-color: var(--popup-bg);
	border-radius: 8px;
	box-shadow: 0 -2px 10px rgba(0 0 0 / 0.1);
`;

export default styled.div`
	position: fixed;
	z-index: 9999;
	inset: 0;
	display: grid;
	place-items: center;
`;
