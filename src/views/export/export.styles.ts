import styled from 'styled-components';

export const Button = styled.button`
	margin: 0;
	padding: 18px 36px;
	color: var(--text-color);
	font-weight: 200;
	font-size: 48px;
	background-color: transparent;
	border: none;
	cursor: pointer;
	font-variant-caps: all-petite-caps;
`;

export default styled.div`
	position: fixed;
	bottom: 0;
	left: 50%;
	display: flex;
	justify-content: center;
	width: 100vw;
	padding: 18px 0;
	background-color: #5f5f5f60;
	transform: translateX(-50%);
	backdrop-filter: blur(2px);
`;
