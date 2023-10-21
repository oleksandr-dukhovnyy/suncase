const getFilterItem = (filters: Glasses.Filter[], name: string) =>
  filters.find((f) => f.name === name);

export default <Store.Mutations<Glasses.State>>{
  SET_SUNGLASESS(state, sunglasessList) {
    state.sunglasessList = sunglasessList;
  },
  SET_LOADER(state, value) {
    state.loading = value;
  },
  TOGGLE_FILTER_GENDERS(state, gender) {
    const item = state.filters.genders.find((i) => i.name === gender);

    if (item) item.active = !item.active;
  },
  TOGGLE_FILTER_CATEGORIES(state, category) {
    const item = state.filters.categories.find((i) => i.name === category);

    if (category === 'price-low-to-hight') {
      const priceHightToLow = getFilterItem(
        state.filters.categories,
        'price-hight-to-low'
      );

      priceHightToLow && (priceHightToLow.active = false);
    } else if (category === 'price-hight-to-low') {
      const priceLowToHight = getFilterItem(
        state.filters.categories,
        'price-low-to-hight'
      );

      priceLowToHight && (priceLowToHight.active = false);
    }

    item && (item.active = !item.active);
  },
  TOGGLE_FILTER_BRANDS(state, brand) {
    const item = state.filters.brands.find((i) => i.name === brand);

    item && (item.active = !item.active);
  },
};
