import styled from 'styled-components';

export const Img = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`;

export const Preview = styled.div<{ $isActive: boolean }>`
	width: 72px;
	height: 72px;
	margin: 0;
	padding: 0;
	overflow: hidden;
	background-color: transparent;
	border: 2px solid ${({ $isActive }) => ($isActive ? 'var(--accent-yellow)' : 'transparent')};
	border-radius: 8px;
`;

export const Label = styled.label<{ $isActive: boolean }>`
	color: ${({ $isActive }) => ($isActive ? 'var(--accent-yellow)' : 'var(--text-color)')};
	font-weight: ${({ $isActive }) => ($isActive ? '700' : '500')};
	font-size: 14px;
	font-variant-caps: all-petite-caps;
`;

export const ActiveArea = styled.button`
	display: flex;
	flex-direction: column;
	gap: 8px;
	align-items: center;
	margin: 0;
	padding: 0;
	background-color: transparent;
	border: none;
`;

export default styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
	align-items: center;
	margin: 0;
	padding: 0;
	background-color: transparent;
	border: none;
	cursor: pointer;
`;
