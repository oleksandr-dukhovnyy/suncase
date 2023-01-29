import glassList from './glassList.js';
import applyFilters from './applyFilters.js';

const getFilterItem = (filters, name) => filters.find((f) => f.name === name);

export default {
  namespaced: true,
  actions: {
    FETCH_SUNGLASESS({ commit }) {
      commit('SET_LOADER', true);

      setTimeout(() => {
        commit('SET_SUNGLASESS', JSON.parse(JSON.stringify(glassList)));
        commit('SET_LOADER', false);
      }, 200);
    },
    TOGGLE_FILTER_GENDERS({ commit }, gender) {
      commit('TOGGLE_FILTER_GENDERS', gender);
    },
    TOGGLE_FILTER_CATEGORIES({ commit }, category) {
      commit('TOGGLE_FILTER_CATEGORIES', category);
    },
    TOGGLE_FILTER_BRANDS({ commit }, brand) {
      commit('TOGGLE_FILTER_BRANDS', brand);
    },
  },
  mutations: {
    SET_SUNGLASESS(state, sunglasessList) {
      state.sunglasessList = sunglasessList;
    },
    SET_LOADER(state, value) {
      state.loading = value;
    },
    TOGGLE_FILTER_GENDERS(state, gender) {
      const item = state.filters.genders.find((i) => i.name === gender);

      item.active = !item.active;
    },
    TOGGLE_FILTER_CATEGORIES(state, category) {
      const item = state.filters.categories.find((i) => i.name === category);

      if (category === 'price-low-to-hight') {
        const priceHightToLow = getFilterItem(
          state.filters.categories,
          'price-hight-to-low'
        );

        priceHightToLow.active = false;
      } else if (category === 'price-hight-to-low') {
        const priceLowToHight = getFilterItem(
          state.filters.categories,
          'price-low-to-hight'
        );

        priceLowToHight.active = false;
      }

      item.active = !item.active;
    },
    TOGGLE_FILTER_BRANDS(state, brand) {
      const item = state.filters.brands.find((i) => i.name === brand);

      item.active = !item.active;
    },
  },
  state: {
    sunglasessList: [],
    loading: false,
    filters: {
      genders: [
        { name: 'man', active: false },
        { name: 'woman', active: false },
        { name: 'kids', active: false },
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
      ],
    },
  },
  getters: {
    SUNGLASESS_LOADING: (state) => state.loading,
    SUNGLASESS_LIST: (state) =>
      applyFilters(state.filters, state.sunglasessList),
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
    UNFILTERED_SUNGLASESS_LIST: (state) => state.sunglasessList,
  },
};
