import styled from 'styled-components';

export const NavItem = styled.a`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 64px;
	height: 64px;
	color: var(--controls-dim-text);
	background-color: transparent;
	border-radius: 50%;

	&[aria-disabled='true'] {
		cursor: not-allowed;
		opacity: 0.5;
		pointer-events: none;
	}

	&.active {
		color: var(--controls-text);
		background-color: var(--accent);
	}
`;

export default styled.div`
	position: fixed;
	top: 50%;
	left: 24px;
	display: flex;
	flex-direction: column;
	gap: 24px;
	align-items: center;
	justify-content: center;
	padding: 8px;
	background-color: var(--controls-bg);
	border-radius: 48px;
	transform: translateY(-50%);
`;
