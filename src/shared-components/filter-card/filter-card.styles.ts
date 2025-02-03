import styled, { css } from 'styled-components';

export const ActiveArea = styled.button`
	display: flex;
	flex-direction: column;
	gap: 8px;
	align-items: center;
	margin: 0;
	padding: 0;
	border: none;
	background-color: transparent;
`;

export const Edit = styled.span<{ $isActive: boolean }>`
	border: none;
	font-weight: 500;
	font-size: 14px;
	background-color: ${({ $isActive }) => ($isActive ? 'var(--accent-yellow)' : 'var(--bg-color)')};
	color: ${({ $isActive }) => ($isActive ? 'var(--bg-color)' : 'var(--text-color)')};
	padding: 3px 12px 6px 12px;
	border-radius: 8px;
	font-variant-caps: all-petite-caps;
`;

export const Label = styled.label<{ $isActive: boolean }>`
	color: ${({ $isActive }) => ($isActive ? 'var(--accent-yellow)' : 'var(--text-color)')};
	font-weight: ${({ $isActive }) => ($isActive ? '700' : '500')};
	font-size: 14px;
	font-variant-caps: all-petite-caps;
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

const filters = {
	original: 'none',
	'rotate-left': css`
		transform: rotate(-90deg);
	`,
	'rotate-right': css`
		transform: rotate(90deg);
	`,
	'mirror-horizontal': css`
		transform: scaleX(-1);
	`,
	'mirror-vertical': css`
		transform: scaleY(-1);
	`,
	grayscale: css`
		filter: grayscale(1);
	`,
	invert: css`
		filter: invert(1);
	`,
	sepia: css`
		filter: sepia(1);
	`,
	blur: css`
		filter: blur(2px);
	`
};

export const Img = styled.img<{ $effect: keyof typeof filters }>`
	width: 100%;
	height: 100%;
	object-fit: cover;
	${({ $effect }) => filters[$effect] || filters.original};
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
