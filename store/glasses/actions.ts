import glassList from './glassList';

export default <Store.Actions>{
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
};
