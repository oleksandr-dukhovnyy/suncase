export const getYScroll = ( startTouch, node ) => {
	// console.log( startTouch, endTouch );

	// let stX = startTouch.changedTouches[0].clientX;
	let stY = startTouch.changedTouches[0].clientY;

	// let enX = endTouch.changedTouches[0].clientX;
	let enY = endTouch.changedTouches[0].clientY;

	node.scrollBy( 0, stY - enY );
};