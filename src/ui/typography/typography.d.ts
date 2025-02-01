export type TextProps = {
	$bold?: boolean;
	$shade?: 'light' | 'regular' | 'inherit';
	$align?: 'center' | 'left' | 'right';
	$weight?: number | string;
};

export type HeaderProps = {
	$align?: TextProps['$align'];
	$weight?: number | string;
};
