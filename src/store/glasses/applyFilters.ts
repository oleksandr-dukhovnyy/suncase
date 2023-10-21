/*
  {
    brand: 'Maui Jim',
    sale: true,
    oldCoast: 385,
    model: 'Mavericks',
    coast: 255,
    id: '1',
    gender: 'all',
    saled: 453,
    isNew: false,
    lng: 4,
  }

  {
    genders: [
      { name: 'man', active: false },
      { name: 'kids', active: false },
      { name: 'woman', active: false },
    ],
    categories: [
      { name: 'new', active: false },
      { name: 'sale', active: false },
      { name: 'most-popular', active: false },
      { name: 'price-low-to-hight', active: false },
      { name: 'price-hight-to-low', active: false },
    ],
    brands: [
      { name: 'Levis', active: false },
      { name: 'Prada', active: false },
      { name: 'Oakley', active: false },
      { name: 'Persol', active: false },
      { name: 'Versace', active: false },
      { name: 'Ray-Ban', active: false },
      { name: 'Polaroid', active: false },
      { name: 'Maui Jim', active: false },
      { name: 'Saint Laurent', active: false },
      { name: 'Christian Dior', active: false },
    ]
  }
*/

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
