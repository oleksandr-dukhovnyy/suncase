export default function scrollToCatalogAndTop() {
  // If #js-catalog in top of us, scroll to js-catalog, else scroll to top of page

  if (globalThis?.window) {
    // Temporary solution
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Ready implementation
    // const catalogNode = document.getElementById('js-catalog');
    // if (!catalogNode) return;

    // const isScrollToTop = catalogNode.offsetTop > window.pageYOffset;

    // if (isScrollToTop) {
    //   window.scrollTo({ top: 0, behavior: 'smooth' });
    // } else {
    //   catalogNode.scrollIntoView({ behavior: 'smooth' });
    // }
  }
}
