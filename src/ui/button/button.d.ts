import { type AriaButtonProps } from 'react-aria-components';
import type { FileRoutesByTo } from '@src/routeTree.gen';

export type InternalProps = {
	tyvariantpe?: 'primary' | 'faded';
	size?: 'medium';
	to?: FileRoutesByTo;
	isFullWidth?: boolean;
	isSecondary?: boolean;
	isGlowing?: boolean;
};

export type StyleProps = {
	$variant: InternalProps['variant'];
	$size: InternalProps['size'];
	$isFullWidth: InternalProps['isFullWidth'];
	$isSecondary: InternalProps['isSecondary'];
	$isGlowing: InternalProps['isGlowing'];
};

export type Props = InternalProps & AriaButtonProps;
