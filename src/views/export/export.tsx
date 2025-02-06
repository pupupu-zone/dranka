import React, { useContext } from 'react';
import { useUnit } from 'effector-react';

import { $images } from '@store';
import { saveBase64 } from '@utils';

import { Button as AriaButton } from 'react-aria-components';
import Root, { Button } from './export.styles';

import MainContext from '@views/context';

const ExportView = () => {
	const { original64 } = useUnit($images);
	const { actions, applyFilters } = useContext(MainContext);

	const saveImage = () => {
		const modifiedImage = applyFilters(actions, original64);

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
