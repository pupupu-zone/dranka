import { createGlobalStyle } from 'styled-components';

import OnestVariableUrl from '@fonts/Onest-variable.ttf';

const FontStyles = createGlobalStyle`
	@font-face {
		font-weight: 100 1000;
		font-family: 'Nunito Sans';
		font-style: normal;
		src: url("${OnestVariableUrl}") format('truetype-variations');
		font-optical-sizing: auto;
		font-variation-settings:
		"wdth" 100,
		"YTLC" 500;
	}
`;

export default FontStyles;
