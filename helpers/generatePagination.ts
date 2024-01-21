interface PageItem<T, To> {
  type: T;
  label: string | number;
  to: To;
  active: boolean;
}

type Page = PageItem<
  'page',
  {
    path: string;
    query: { [key: string]: string | string[] | undefined };
  }
>;

type Offset = PageItem<'offset', null>;

export default function generatePagination(
  currentPage: number,
  offset: number,
  totalPages: number
): (number | null)[] {
  const pagination = [] as (number | null)[];

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - offset && i <= currentPage + offset)
    ) {
      pagination.push(i === currentPage ? i : i);
    } else if (pagination[pagination.length - 1] !== null) {
      pagination.push(null);
    }
  }

  return pagination;
}

export function buildPage(
  page: number | null,
  queryName = 'page'
): Page | Offset {
  const route = useRoute();
  const locator = useLocator();

  if (page === null) {
    return {
      type: 'offset',
      label: '...',
      active: false,
      to: null,
    };
  }

  const label = locator.t(`pagination-pages.${page - 1}`, '' + page, false);

  return {
    type: 'page',
    label,
    active: page === (+route.query[queryName] || 1),
    to: {
      path: route.path,
      query: {
        ...route.query,

        // Remove page from query if page is 1
        [queryName]: page === 1 ? undefined : page,
      },
    },
  };
}
