import { LocalStTool } from '../../js/LocalStTool.js';

export default {
  namespaced: true,
  actions: {
    FETCH_CART({ commit }) {
      const cloudCart = LocalStTool._get('cart-items') || [];

      commit('SETUP_CART', cloudCart);
    },
    SETUP_CART({ commit }, ids = []) {
      commit('SETUP_CART', ids);
    },
    SET_SHOW({ commit }, value) {
      commit('SET_SHOW', value);
    },
    HIDE_CART({ dispatch }) {
      dispatch('SET_SHOW', false);
    },
    SHOW_CART({ dispatch }) {
      dispatch('SET_SHOW', true);
    },
    ADD_TO_CART({ commit }, id) {
      commit('ADD_TO_CART', id);
    },
    CLEAR_CART({ dispatch }) {
      dispatch('SETUP_CART', []);
    },
    DELETE_ITEM({ commit }, id) {
      commit('DELETE_ITEM', id);
    },
  },
  mutations: {
    SETUP_CART(state, ids) {
      state.cart = [...ids];

      LocalStTool._add('cart-items', state.cart);
    },
    SET_SHOW(state, value) {
      state.showCartPopup = value;
    },
    ADD_TO_CART(state, id) {
      state.cart.push(id);

      LocalStTool._add('cart-items', state.cart);
    },
    DELETE_ITEM(state, id) {
      state.cart = state.cart.filter((itemId) => itemId !== id);

      LocalStTool._add('cart-items', state.cart);
    },
  },
  state: {
    cart: [],
    showCartPopup: false,
  },
  getters: {
    CART(state, _, __, rootGetters) {
      return rootGetters['glasses/UNFILTERED_SUNGLASESS_LIST'].filter((item) =>
        state.cart.includes(item.id)
      );
    },
    CART_LENGTH: (_, getters) => getters.CART.length,
    CART_TOTAL_PRICE: (_, getters) =>
      getters.CART.reduce((a, c) => a + c.coast, 0),
    SHOW_CART_POPUP: (state) => state.showCartPopup,
  },
};
