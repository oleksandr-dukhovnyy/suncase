const OFFSET = 100;

/**
 * Scrolls the page to the goods section.
 */
export const scrollToGoods = () => {
  const catalogNode = document.getElementById('js-catalog');
  let top = OFFSET;

  if (catalogNode) {
    // @ts-ignore
    top = catalogNode.offsetTop || OFFSET;
  }

  window.scrollTo({
    top: top - OFFSET,
    behavior: 'smooth',
  });
};
