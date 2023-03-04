// import { LocalStTool } from '../../js/LocalStTool.js';
import cartStorage from './saveToStorage.js';
import bodyScroll from '../../js/bodyScroll.js';
import openWin from '../../js/openPayWindow.js';

export default {
  namespaced: true,
  actions: {
    FETCH_CART({ commit }) {
      const cloudCart = cartStorage.loadCart() || [];

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
    ADD_TO_CART({ commit, state, dispatch }, id) {
      if (state.cart.map(({ id }) => id).includes(id)) {
        dispatch('INC_ITEM_COUNT', id);
      } else {
        commit('ADD_TO_CART', { id, count: 1 });
      }
    },
    CLEAR_CART({ dispatch }) {
      dispatch('SETUP_CART', []);
    },
    DELETE_ITEM({ commit }, id) {
      commit('DELETE_ITEM', id);
    },
    CHANGE_ITEM_COUNT({ commit, getters }, { id, count }) {
      const item = getters.CART.find(({ id: _id }) => _id === id);

      if (!item)
        return console.error('CHANGE_ITEM_COUNT: item === undefined', {
          id,
          count,
        });

      const sum = item.count + count;

      if (sum < 1) return console.error('CHANGE_ITEM_COUNT: sum < 0', { item });
      if (sum > 9) return console.error('CHANGE_ITEM_COUNT: sum > 9', { item });

      commit('CHANGE_ITEM_DATA', {
        id,
        data: { count: sum },
      });
    },
    DEC_ITEM_COUNT({ dispatch }, id) {
      dispatch('CHANGE_ITEM_COUNT', {
        id,
        count: -1,
      });
    },
    INC_ITEM_COUNT({ dispatch }, id) {
      dispatch('CHANGE_ITEM_COUNT', {
        id,
        count: 1,
      });
    },
    CHANGE_ITEM_DATA({ commit }, { id, data }) {
      commit('CHANGE_ITEM_DATA', {
        id,
        data,
      });
    },
    BUY_ALL({ dispatch, getters }) {
      openWin({ coast: getters.CART_TOTAL_PRICE }, getters.CART.length, () => {
        dispatch('CLEAR_CART');
        dispatch('HIDE_CART');
      });
    },
  },
  mutations: {
    SETUP_CART(state, cartItems) {
      const newCart = structuredClone(cartItems);

      state.cart = newCart;

      cartStorage.saveCart(newCart);
    },
    SET_SHOW(state, value) {
      bodyScroll.set(value);

      state.showCartPopup = value;
    },
    ADD_TO_CART(state, { id, count = 1 }) {
      state.cart.push({ id, count });

      cartStorage.saveCart(state.cart);
    },
    DELETE_ITEM(state, id) {
      state.cart = state.cart.filter(({ id: itemId }) => itemId !== id);

      cartStorage.saveCart(state.cart);
    },
    CHANGE_ITEM_DATA(state, { id, data = {} }) {
      const newCart = state.cart.map((cartItem) => {
        return cartItem.id === id ? { ...cartItem, ...data } : cartItem;
      });

      state.cart = newCart;
      cartStorage.saveCart(newCart);
    },
  },
  state: {
    cart: [],
    /*
    cart: [
      { id: 1, count: 5 },
      { id: 2, count: 1 },
      { id: 3, count: 3 },
      { id: 4, count: 7 },
    ]
    */
    showCartPopup: false,
  },
  getters: {
    CART(state, _, __, rootGetters) {
      return rootGetters['glasses/UNFILTERED_SUNGLASESS_LIST']
        .filter((item) => state.cart.find(({ id }) => '' + item.id === '' + id))
        .map((item) => ({
          ...item,
          count: state.cart.find(({ id }) => '' + item.id === '' + id).count,
        }));
    },
    CART_LENGTH: (_, getters) =>
      getters.CART.reduce((acc, curr) => acc + curr.count, 0),
    CART_TOTAL_PRICE: (_, getters) =>
      getters.CART.reduce((a, c) => a + c.coast * c.count, 0),
    SHOW_CART_POPUP: (state) => state.showCartPopup,
  },
};
