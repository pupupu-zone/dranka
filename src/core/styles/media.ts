const breakpoints = {
	small: '580px',
	medium: '768px',
	large: '1024px',
	xl: '1200px'
};

const media = {
	small: `@media (${breakpoints.small} <= width)`,
	medium: `@media (${breakpoints.medium} <= width)`,
	large: `@media (${breakpoints.large} <= width)`,
	xl: `@media (${breakpoints.xl} <= width)`
};

export default media;
