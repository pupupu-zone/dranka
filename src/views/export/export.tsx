import React, { useContext } from 'react';
import MainContext from '@views/context';

import { saveBase64 } from '@utils';

import { Button as AriaButton } from 'react-aria-components';
import Root, { Button } from './export.styles';

const ExportView = () => {
	const { actions, applyFilters, originalImage64 } = useContext(MainContext);

	const saveImage = () => {
		const modifiedImage = applyFilters(actions, originalImage64);

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
