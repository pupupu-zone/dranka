import { fileURLToPath } from 'url';
import { defineConfig, loadEnv } from 'vite';

import svgr from 'vite-plugin-svgr';
import wasm from 'vite-plugin-wasm';
import react from '@vitejs/plugin-react-swc';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import templateLiteralPlugin from './vite-plugin-minify-template-literals/index.cjs';

import { dependencies } from './package.json';

const buildTime = new Date().toLocaleDateString('ru-RU', {
	hour: '2-digit',
	minute: '2-digit',
	year: '2-digit',
	month: '2-digit',
	day: '2-digit'
});

const globalVendorPackages = ['react', 'react-dom', '@tanstack/react-router', 'styled-components', 'typescript'];

function renderChunks(deps) {
	let chunks = {};

	Object.keys(deps).forEach((key) => {
		if (globalVendorPackages.includes(key)) return;
		chunks[key] = [key];
	});

	return chunks;
}

const config = ({ mode }) => {
	process.env = {
		...process.env,
		...loadEnv(mode, process.cwd()),
		VITE_BUILD_TIME: buildTime
	};

	return defineConfig({
		build: {
			minify: 'terser',
			target: 'esnext',
			sourcemap: false,
			rollupOptions: {
				external: ['chokidar'],
				output: {
					manualChunks: {
						vendor: globalVendorPackages,
						...renderChunks(dependencies)
					}
				}
			}
		},
		plugins: [
			TanStackRouterVite({
				routesDirectory: './src/core/routes',
				quoteStyle: 'single',
				enableRouteGeneration: true,
				autoCodeSplitting: false
			}),
			wasm(),
			svgr(),
			react(),
			templateLiteralPlugin()
		],
		resolve: {
			alias: {
				'@src': fileURLToPath(new URL('./src', import.meta.url)),
				'@styles': fileURLToPath(new URL('./src/core/styles', import.meta.url)),
				'@core': fileURLToPath(new URL('./src/core', import.meta.url)),
				'@ui': fileURLToPath(new URL('./src/ui', import.meta.url)),
				'@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
				'@hooks': fileURLToPath(new URL('./src/utils/hooks', import.meta.url)),
				'@icons': fileURLToPath(new URL('./src/assets/icons', import.meta.url)),
				'@images': fileURLToPath(new URL('./src/assets/images', import.meta.url)),
				'@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
				'@fonts': fileURLToPath(new URL('./src/assets/fonts', import.meta.url)),
				'@views': fileURLToPath(new URL('./src/views', import.meta.url))
			}
		},
		server: {
			port: 4400,
			open: true
		},
		preview: {
			port: 4230
		}
	});
};

export default config;
