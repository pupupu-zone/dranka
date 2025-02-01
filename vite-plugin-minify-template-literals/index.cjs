// https://github.com/gatsbylabs/vite-plugin-minify-template-literals/blob/main/src/index.ts

import { minifyRaw } from 'babel-plugin-styled-components/lib/minify';
import MagicString from 'magic-string';
import * as pl from 'parse-literals';

const isStyled = (tag) => /^(styled|css|createGlobalStyle|keyframes)/.test(tag);

const getMinifier = (tag) => {
	if (isStyled(tag)) {
		const minify = (code) => {
			const [res] = minifyRaw(code);
			return res;
		};

		return minify;
	}

	return null;
};

function plugin() {
	const setup = {
		name: 'vite-plugin-minify-template-literals',
		enforce: 'pre',
		apply: 'build',
		transform(code) {
			const templates = pl.parseLiterals(code);
			if (!templates.length) return;

			const ms = new MagicString(code);

			templates.forEach((template) => {
				if (!template.tag) return;
				const minify = getMinifier(template.tag);

				if (minify) {
					template.parts.forEach((part) => {
						if (part.start < part.end) {
							const mini = minify(part.text);
							ms.overwrite(part.start, part.end, mini);
						}
					});
				}
			});

			return ms.toString();
		}
	};

	return setup;
}

export default plugin;
