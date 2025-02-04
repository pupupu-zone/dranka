import styled from 'styled-components';

export const Button = styled.button`
	width: 100%;
	height: 100%;
	margin: 0;
	padding: 18px 0;
	color: var(--text-color);
	font-weight: 200;
	font-size: 36px;
	background-color: transparent;
	border: none;
	cursor: pointer;
`;

export default styled.div`
	position: fixed;
	bottom: 0;
	left: 50%;
	display: flex;
	justify-content: center;
	width: 100vw;
	background-color: #5f5f5f80;
	transform: translateX(-50%);
	backdrop-filter: blur(2px);
`;
