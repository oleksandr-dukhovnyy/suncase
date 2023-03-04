import bodyScroll from '../../js/bodyScroll.js';
import openWin from '../../js/openPayWindow.js';

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
    BUY_IT({ dispatch, rootGetters }, id) {
      const item = rootGetters['glasses/UNFILTERED_SUNGLASESS_LIST'].find(
        ({ id: itemId }) => itemId === id
      );

      if (item) {
        openWin(item, 1, () => {
          dispatch('HIDE_SLIDER');
        });
      } else {
        console.error(`item (id === ${id}) not found`);
      }
    },
  },
  mutations: {
    SET_SLIDER_SHOW(state, bool) {
      bodyScroll.set(bool);

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
