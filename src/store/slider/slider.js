export default {
  namespaced: true,
  actions: {
    SET_SLIDER_SHOW({ commit }, bool) {
      commit('SET_SLIDER_SHOW', bool);
    },
    TOGGLE_SLIDER_SHOW({ commit, state }) {
      commit('SET_SLIDER_SHOW', !state.getters.MODAL_SHOW);
    },
    HIDE_SLIDER({ dispatch }) {
      dispatch('SET_SLIDER_SHOW', false);
    },
    SHOW_SLIDER({ dispatch }) {
      dispatch('SET_SLIDER_SHOW', true);
    },
    SET_SELECTED({ commit }, id) {
      commit('SET_SELECTED', id);
    },
  },
  mutations: {
    SET_SLIDER_SHOW(state, bool) {
      state.show = bool;
    },
    SET_SELECTED(state, id) {
      state.selected = id;
    },
  },
  state: {
    show: false,
    selected: null,
  },
  getters: {
    SLIDER_SHOW: (state) => state.show,
    SELECTED_ITEM: (state, _, __, globalGetters) => {
      const item =
        globalGetters['glasses/UNFILTERED_SUNGLASESS_LIST'].find(
          (item) => item.id === state.selected
        ) || null;

      return {
        item,
        defined: item !== null,
      };
    },
  },
};
