const checkInFilter = (name: string, list: Filter[]) => {
  const listItem = list.find((item) => item.name === name) || { active: false };

  return listItem.active;
};

const applyFilters = (filters: Glasses.Filters, list: Glasses.Item[]) => {
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
        return b.saled - a.saled;
      }

      return 0;
    })
    .sort((a, b) => {
      switch (true) {
        case priceFilter['price-hight-to-low']:
          return a.coast - b.coast;

        case priceFilter['price-low-to-hight']:
          return b.coast - a.coast;

        default:
          return 0;
      }
    });
};

export default applyFilters;
