import { createGlobalStyle } from 'styled-components';

const Reset = createGlobalStyle`
	/* stylelint-disable selector-no-vendor-prefix */

	html, body, div, span, applet, object, iframe,
	h1, h2, h3, h4, h5, h6, p, blockquote, pre,
	a, abbr, acronym, address, big, cite, code,
	del, dfn, em, img, ins, kbd, q, s, samp,
	small, strike, strong, sub, sup, tt, var,
	b, u, i, center,
	dl, dt, dd, ol, ul, li,
	fieldset, form, label, legend,
	table, caption, tbody, tfoot, thead, tr, th, td,
	article, aside, canvas, details, embed,
	figure, figcaption, footer, header, hgroup,
	menu, nav, output, ruby, section, summary,
	time, mark, audio, video {
		margin: 0;
		padding: 0;
		font: inherit;
		vertical-align: baseline;
		border: 0;
	}

	article, aside, details, figcaption, figure,
	footer, header, hgroup, menu, nav, section {
		display: block;
	}

	* {
		box-sizing: inherit;
		${'' /* -webkit-appearance: none; */}
		-moz-osx-font-smoothing: grayscale;
		-webkit-font-smoothing: antialiased;
		-webkit-tap-highlight-color: transparent;
		backface-visibility: hidden;

		&::before, &::after {
			box-sizing: inherit;
		}
	}

	html, body {
		width: 100%;
		min-height: 100%;
	}

	html {
		box-sizing: border-box;
		font-family: sans-serif;
		text-size-adjust: 100%;
	}

	body {
		font-family: inherit;
		line-height: 1;
	}

	ol, ul {
		list-style: none;
	}

	blockquote, q {
		quotes: none;

		&::before, &::after {
			content: '';
			content: none;
		}
	}

	table {
		border-collapse: collapse;
		border-spacing: 0;
	}

	input, textarea, button {
		font-family: inherit;
	}

	input[disabled] {
		-webkit-text-fill-color: inherit;
		color: inherit;
	}

	textarea {
		overflow: hidden;
		resize: none;
	}

	a {
		text-decoration: none;
		background-color: transparent;
		text-decoration-skip-ink: auto;

		&:hover, &:active, &:visited {
			text-decoration: none;
			outline-width: 0;
		}
	}

	${'' /* Hide the overflow in IE. */}
	svg:not(:root) {
		overflow: hidden;
	}

	${'' /* Remove the border on images inside links. */}
	img {
		border-style: none;
	}

	button::-moz-focus-inner,
	[type='button']::-moz-focus-inner,
	[type='reset']::-moz-focus-inner,
	[type='submit']::-moz-focus-inner {
		padding: 0;
		border-style: none;
	}

	::-webkit-input-placeholder {
		color: inherit;
		opacity: 0.54;
	}
`;

export default Reset;
