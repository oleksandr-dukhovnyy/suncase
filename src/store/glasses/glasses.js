import glassList from './glassList.js';

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
  },
  mutations: {
    SET_SUNGLASESS(state, sunglasessList) {
      state.sunglasessList = sunglasessList;
    },
    SET_LOADER(state, value) {
      state.loading = value;
    },
    TOGGLE_FILTER_GENDERS(state, gender) {
      const index = state.filters.genders.indexOf(gender);

      if (index !== -1) {
        state.filters.genders.splice(index, 1);
      } else {
        state.filters.genders = [...state.filters.genders, gender];
      }
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
      categories: [],
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
      state.sunglasessList.filter((item) => {
        const rules = [
          state.filters.genders.length === 0 ||
            item.gender === 'all' ||
            state.filters.genders
              .filter(({ active }) => active)
              .map(({ name }) => name)
              .includes(item.gender),
          state.filters.brands.length === 0 ||
            state.filters.brands.includes(item.brend) ||
            state.filters.brands
              .filter(({ active }) => active)
              .map(({ name }) => name)
              .includes(item.gender),
          item.brend === 'all',
        ];

        return rules.every((r) => r === true);
      }),
    ACTIVE_GENDERS: (state) => state.filters.genders,
    ACTIVE_CATEGORIES: (state) => state.filters.categories,
    ACTIVE_BRANDS: (state) => state.filters.brands,
  },
};
