let locked = false;

const API = {
  add: () => toggleScroll(false),
  rem: () => toggleScroll(true),
  set: toggleScroll,

  /**
   * Updates the balance and toggles scroll based on the given disable value.
   */
  lockedNow: () => locked,
};

export default API;

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
