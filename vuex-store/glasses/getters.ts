import applyFilters from './applyFilters';

export default <Store.Getters<Glasses.State, any>>{
  SUNGLASSES_LOADING: (state) => state.loading,
  SUNGLASSES_LIST: (state) => applyFilters(state.filters, state.SUNGLASSESList),
  ACTIVE_GENDERS: (state) => state.filters.genders,
  ACTIVE_CATEGORIES: (state) => state.filters.categories,
  ACTIVE_BRANDS: (state) => state.filters.brands,
  FILTERS: (state) => {
    const filters = [];

    for (let filterType in state.filters) {
      filters.push({
        type: filterType,
        items: state.filters[filterType].map((item) => ({
          ...item,
          title: item.name.replace(/-/g, ' '),
        })),
      });
    }

    return filters;
  },
  UNFILTERED_SUNGLASSES_LIST: (state) => state.SUNGLASSESList,
};
