let locked = false;
let balance = 0;

export default {
  add: () => toggleScroll(false),
  rem: () => toggleScroll(true),
  tggl: () => toggleScroll(),
  set: toggleScroll,

  /**
   * Updates the balance and toggles scroll based on the given disable value.
   */
  balancedSet(disable = !locked) {
    if (disable) {
      balance += 1;
    } else {
      balance -= 1;
    }

    if (balance > 0) {
      toggleScroll(true);
    } else {
      toggleScroll(false);
    }
  },
  lockedNow: () => locked,
};

function toggleScroll(disable = !locked) {
  document.body.style.overflow = disable ? 'hidden' : '';
  document.body.style.paddingRight = disable ? `${getScrollWidth()}px` : '';

  locked = disable;
}

function getScrollWidth() {
  let div = document.createElement('div');

  div.style.overflowY = 'scroll';
  div.style.width = '50px';
  div.style.height = '50px';

  document.body.append(div);
  const scrollWidth = div.offsetWidth - div.clientWidth;

  div.remove();

  return scrollWidth;
}
