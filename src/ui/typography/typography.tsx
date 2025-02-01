import styled, { css } from 'styled-components';
import type { TextProps, HeaderProps } from './typography.d';

const shades = {
	light: css`
		color: #999;
		opacity: 0.6; /* @TODO: Rewrite to actual color */
	`,
	regular: css`
		color: var(--primary-text);
		opacity: 1;
	`,
	inherit: css`
		color: inherit;
	`
};

const aligns = {
	center: css`
		text-align: center;
	`,
	left: css`
		text-align: left;
	`,
	right: css`
		text-align: right;
	`
};

export const H1 = styled.h1<HeaderProps>`
	font-weight: ${({ $weight }) => $weight || 700};
	font-size: 24px;
	font-family: 'Nunito Sans', sans-serif;
	line-height: 32px;

	${({ $align }) => aligns[$align || 'left']}
`;

export const H2 = styled.h2<HeaderProps>`
	font-weight: ${({ $weight }) => $weight || 600};
	font-size: 22px;
	font-family: 'Nunito Sans', sans-serif;
	line-height: 24px;

	${({ $align }) => aligns[$align || 'left']}
`;

export const H3 = styled.h3<HeaderProps>`
	font-weight: ${({ $weight }) => $weight || 600};
	font-size: 18px;
	font-family: 'Nunito Sans', sans-serif;
	line-height: 22px;

	${({ $align }) => aligns[$align || 'left']}
`;

export const H4 = styled.h3<HeaderProps>`
	font-weight: 600;
	font-size: 16px;
	font-family: 'Nunito Sans', sans-serif;
	line-height: 20px;

	${({ $align }) => aligns[$align || 'left']}
`;

export const SmallText = styled.span<TextProps>`
	font-weight: ${({ $bold, $weight }) => {
		if ($weight) return $weight;

		return $bold ? 700 : 400;
	}};
	font-size: 14px;
	font-family: 'Nunito Sans', sans-serif;
	line-height: 19px;

	${({ $shade = 'regular' }) => shades[$shade]}
	${({ $align }) => aligns[$align || 'left']}
`;

export const Text = styled.span<TextProps>`
	font-weight: ${({ $bold, $weight }) => {
		if ($weight) return $weight;

		return $bold ? 700 : 400;
	}};
	font-size: 16px;
	font-family: 'Nunito Sans', sans-serif;
	line-height: 20px;

	${({ $shade = 'regular' }) => shades[$shade]}
	${({ $align }) => aligns[$align || 'left']}
`;

export const LargeText = styled.span<TextProps>`
	font-weight: ${({ $bold, $weight }) => {
		if ($weight) return $weight;

		return $bold ? 700 : 400;
	}};
	font-size: 18px;
	font-family: 'Nunito Sans', sans-serif;
	line-height: 25px;

	${({ $shade = 'regular' }) => shades[$shade]}
	${({ $align }) => aligns[$align || 'left']}
`;
