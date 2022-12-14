import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

export default {
  add: (target = document.body) => {
    enableBodyScroll(target);
  },
  rem: (target = document.body) => {
    console.log('rem');
    disableBodyScroll(target, {
      allowTouchMove: (el) => {
        while (el && el !== document.body) {
          if (el.getAttribute('body-scroll-lock-ignore') !== null) {
            return true;
          }

          el = el.parentElement;
        }
      },
    });
  },
};
