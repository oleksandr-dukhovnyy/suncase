// libs
import {
	disablePageScroll,
	enablePageScroll,
	clearQueueScrollLocks
} from '../js/scroll-lock-fixed/scroll-lock.js';

const mobileHamburger = document.querySelector( '.hamburger' );

const addBodyScroll = () => {
	clearQueueScrollLocks();
	enablePageScroll( mobileHamburger );
}

const removeBodyScroll = () => {
	disablePageScroll( mobileHamburger );
}
export default {
	add: addBodyScroll,
	rem: removeBodyScroll
};