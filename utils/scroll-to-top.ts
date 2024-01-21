import { useGlassesStore } from '~/store/glasses';

export default async function scrollToTop() {
  if (globalThis?.window) {
    // Temporary solution

    const router = useRouter();
    const glassesStore = useGlassesStore();

    await router.push({
      query: {
        ...router.query,
        page: undefined,
      },
    });

    glassesStore.RESET_FILTERS();

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 0);

    // If #js-catalog in top of us, scroll to js-catalog, else scroll to top of page
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
