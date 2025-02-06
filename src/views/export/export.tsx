import React from 'react';
import { useUnit } from 'effector-react';

import $images from '@store/images';
import { useApplyFilters } from '@hooks';
import { saveBase64 } from '@utils';

import { Button as AriaButton } from 'react-aria-components';
import Root, { Button } from './export.styles';

const ExportView = () => {
	const { original64 } = useUnit($images);
	const applyFilters = useApplyFilters();

	const saveImage = () => {
		const modifiedImage = applyFilters(original64);

		saveBase64(modifiedImage, 'image');
	};

	if (!original64) {
		return null;
	}

	return (
		<Root>
			<Button as={AriaButton} onPress={saveImage}>
				Save
			</Button>
		</Root>
	);
};

export default ExportView;
