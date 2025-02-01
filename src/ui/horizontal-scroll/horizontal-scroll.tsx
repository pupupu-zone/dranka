import React from 'react';

import Root from './horizontal-scroll.styles';

type Props = React.PropsWithChildren<{
	as?: React.ElementType;
	className?: string;
}>;

const HorizontalScroll = ({ children, ...restProps }: Props) => {
	return <Root {...restProps}>{children}</Root>;
};

export default HorizontalScroll;
