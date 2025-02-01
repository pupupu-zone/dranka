import styled from 'styled-components';

export default styled.div`
	/* stylelint-disable order/properties-order */
	/* stylelint-disable declaration-block-no-redundant-longhand-properties */

	display: grid;
	grid-auto-columns: min-content;
	grid-auto-flow: column;
	gap: 24px;
	width: 100%;
	overflow-x: auto;
	scroll-snap-type: x mandatory;

	/* Prevent grid blowout */
	margin-bottom: -16px; /* Compensate for padding */
	padding-bottom: 16px; /* Space for potential scrollbar */

	/* Hide scrollbar */
	scrollbar-width: none; /* Firefox */
	-ms-overflow-style: none;

	&::-webkit-scrollbar {
		display: none;
	}

	/* Better touch scrolling */
	scroll-behavior: smooth;
	-webkit-overflow-scrolling: touch;

	/* Prevent text selection while scrolling */
	user-select: none;

	/* Add padding to allow for overscroll bounce */
	padding-right: 1px;
	padding-left: 1px;
	margin-left: -1px;
	margin-right: -1px;
`;
