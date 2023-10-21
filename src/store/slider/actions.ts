// @ts-ignore
import openWin from '../../js/openPayWindow.js';

export default <Store.Actions>{
  SET_SLIDER_SHOW({ commit }, bool: boolean) {
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
      ({ id: itemId }: { id: string }) => itemId === id
    );

    if (item) {
      openWin(item, 1, () => {
        dispatch('HIDE_SLIDER');
      });
    } else {
      console.error(`item (id === ${id}) not found`);
    }
  },
};
