export default {
  namespaced: true,
  actions: {
    SETUP_CART({ commit }, ids = []) {
      commit('SETUP_CART', ids);
    },
    SET_SHOW({ commit }, value) {
      commit('SET_SHOW', value);
    },
  },
  mutations: {
    SETUP_CART(state, ids) {
      state.cart = [...ids];
    },
    SET_SHOW(state, value) {
      state.showCartPopup = value;
    },
  },
  state: {
    cart: [],
    showCartPopup: false,
  },
  getters: {
    CART(state, _, __, rootGetters) {
      return rootGetters['glasses/SUNGLASESS_LIST'].filter((item) =>
        state.cart.includes(item.id)
      );
    },
    CART_LENGTH: (_, getters) => getters.CART.length,
    CART_TOTAL_PRICE: (_, getters) =>
      getters.CART.reduce((a, c) => a + c.coast, 0),
    SHOW_CART_POPUP: (state) => state.showCartPopup,
  },
};
