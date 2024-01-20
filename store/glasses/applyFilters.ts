export const applyFilters = (
  filters: Glasses.Filters,
  list: Glasses.Item[]
) => {
  const priceFilter = filters.categories
    .filter(({ name }) =>
      ['price-low-to-hight', 'price-hight-to-low'].includes(name)
    )
    .reduce((a, c) => ((a[c.name] = c.active), a), {} as Filter);

  const categoriesFilters = filters.categories
    .filter(
      ({ name }) => !['price-low-to-hight', 'price-hight-to-low'].includes(name)
    )
    .reduce((a, c) => ((a[c.name] = c.active), a), {} as Filter);

  const showAllGenders = filters.genders.every((item) => !item.active);
  const showAllBrands = filters.brands.every((item) => !item.active);

  return list
    .filter((item) => {
      if (
        !showAllGenders &&
        item.gender !== 'all' &&
        !checkInFilter(item.gender, filters.genders)
      )
        return false;

      if (!showAllBrands && !checkInFilter(item.brand, filters.brands))
        return false;

      if (categoriesFilters.new && !item.isNew) return false;

      if (categoriesFilters.sale && !item.sale) return false;

      return true;
    })
    .sort((a, b) => {
      if (categoriesFilters['most-popular']) {
        return b.sold - a.sold;
      }

      return 0;
    })
    .sort((a, b) => {
      switch (true) {
        case priceFilter['price-hight-to-low']:
          return b.coast - a.coast;

        case priceFilter['price-low-to-hight']:
          return a.coast - b.coast;

        default:
          return 0;
      }
    });
};

function checkInFilter(name: string, list: Filter[]) {
  return (list.find((item) => item.name === name) || { active: false }).active;
}
