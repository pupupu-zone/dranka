import { minify_image } from '@wasm/dranka';
import { createStore, createEvent, sample } from 'effector';

import type { ImageStoreT } from '@store/types.d';

export const setOriginal64 = createEvent<string>();
export const setPreview64 = createEvent<string>();
export const setCompressed64 = createEvent<string>();

const $images = createStore<ImageStoreT>({
	original64: '',
	compressed64: '',
	preview64: ''
});

$images.on(setOriginal64, (state, original64) => ({ ...state, original64 }));
$images.on(setCompressed64, (state, compressed64) => ({ ...state, compressed64 }));
$images.on(setPreview64, (state, preview64) => ({ ...state, preview64 }));

export const compressionRequested = sample({
	source: $images,
	clock: setOriginal64,
	fn: (_state, original64) => original64
});

sample({
	source: compressionRequested,
	fn: (original64) => minify_image(original64),
	target: setCompressed64
});

sample({
	clock: setCompressed64,
	fn: (compressed64) => compressed64,
	target: setPreview64
});

export default $images;
