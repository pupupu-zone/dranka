import React, { useContext } from 'react';
import MainContext from '@views/context';

import { saveBase64 } from '@utils';

import { Button as AriaButton } from 'react-aria-components';
import Root, { Button } from './export.styles';

const ExportView = () => {
	const { appliedFilters, applyFilters, applyActions, strengths, originalImage64 } = useContext(MainContext);

	const saveImage = () => {
		// here we shall send our image through all selected filters
		// and in the end we will receive base64 string, which we have to save.
		// canvas-preview component is just a preview — minified version of real image
		// here we proceed the actual image, so we can't use it to save our image
		let modifiedImage = applyFilters(appliedFilters, originalImage64);

		if (strengths.angle) {
			modifiedImage = applyActions('rotate-right', modifiedImage);
		}

		saveBase64(modifiedImage, 'image');
	};

	if (!originalImage64) {
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
