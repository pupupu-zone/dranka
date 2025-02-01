import { createGlobalStyle } from 'styled-components';

const General = createGlobalStyle`
	/* stylelint-disable custom-property-empty-line-before */

	:root {
		--blue-focus: 60% 0.2 257deg;

		--bg-color: #2A2A2A;
		--bg-color-dark: #232323;
		--accent: #8CC5C5;
		--primary-text: #D3D3D3;
		--secondary-text: #5A5A5A;
		--white: #fafafa;

		--popup-bg: #fefefe;

		--card-hover: #eee;

		--settings-bg: #f1f1f1;
		--settings-hover: #E5E5E5;

		--select-bg: #fefefe;
		--select-hover: #eee;

		/* Typography */
		--error: #D9534F;

		--light-text: #eee;

		/* Inputs */
		--label: #333;
		--input-bg: #F7F7F8;
		--input-border: #E9E9Ea;
		--placeholder: #A1A1A1;

		/* Primary button styles */
		--primary-button-text: #fefefe;
		--primary-button: 58% 0.14 289; ${'' /* #7a6ac7 */}
		--primary-button-hover: 62% 0.14 289; ${'' /* #8A7BDC */}
		--primary-button-press: 42% 0.12 292; ${'' /* #4F3E87 */}

		/* Faded button */

		/* Default category colors */
		--category-1: #f99;
		--category-2: #66b3ff;
		--category-3: #9f9;
		--category-4: #fc9;
		--category-5: #c2c2f0;

		/* Calendar */
		--calendar-width: calc((100vw - 48px - (12px * 7)) / 7);
	}

	html {
		height: 100%;
		min-height: 100%;
		overflow-x: hidden;
		background-color: var(--bg-color);
	}

	body {
		min-height: 100%;
		font-family: 'Nunito Sans', sans-serif;
	}

	#root {
		display: grid;
		grid-auto-columns: 1fr;
		grid-template-rows: 1fr;
		justify-content: center;
		min-width: 100vw;
		min-height: 100vh;
		min-height: 100dvh;
	}

	#masks {
		position: absolute;
		top: -100px;
		left: -100px;
	}

	label {
		cursor: pointer;
	}

	input {
		padding: 0.5rem 1rem;
		font-size: 1rem;
	}

	form {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	input, textarea, a {
		outline: none;

		&:focus-visible {
			box-shadow: 0 0 0 3px oklch(var(--blue-focus) / 0.5);
		}
	}

	/* show outline on focus via anything but touches */
	button {
		outline: none;

		/* we use it in hope to use button from react-aria-components everywhere */
		&:not([data-pressed='true'])[data-focus-visible='true'] {
			box-shadow: 0 0 0 3px oklch(var(--blue-focus) / 0.5);
		}
	}

	input:-webkit-autofill,
	input:-webkit-autofill:hover,
	input:-webkit-autofill:focus,
	input:-webkit-autofill:active {
		/* stylelint-disable-next-line property-no-vendor-prefix */
		-webkit-box-shadow: 0 0 0 60px var(--bg-color) inset !important;
	}

	@supports (-webkit-overflow-scrolling: touch) {
		/* iOS-specific styles here */
		html, body {
			overflow-x: hidden;
		}

		@media (display-mode: standalone) {
			#root {
				min-height: 100vh;
			}
		}
	}
`;

export default General;
