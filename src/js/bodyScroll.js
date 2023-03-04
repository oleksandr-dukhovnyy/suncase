// libs
// import {
//   disablePageScroll,
//   enablePageScroll,
//   clearQueueScrollLocks,
// } from '../js/scroll-lock-fixed/scroll-lock.js';

// const mobileHamburger = document.querySelector('.hamburger');

let locked = false;

const getScrollWidth = () => {
  let div = document.createElement('div');

  div.style.overflowY = 'scroll';
  div.style.width = '50px';
  div.style.height = '50px';

  document.body.append(div);
  const scrollWidth = div.offsetWidth - div.clientWidth;

  div.remove();

  return scrollWidth;
};

const toggleScroll = (bool = !locked) => {
  document.body.style.overflow = bool ? 'hidden' : '';
  document.body.style.paddingRight = bool ? `${getScrollWidth()}px` : '';

  locked = bool;
};

export default {
  add: () => toggleScroll(false),
  rem: () => toggleScroll(true),
  tggl: () => toggleScroll(),
  set: toggleScroll,
  lockedNow: () => locked,
};
