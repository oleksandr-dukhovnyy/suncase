// @ts-ignore
import cartStorage from './saveToStorage.js';
// @ts-ignore
import openWin from '../../js-utils/openPayWindow.js';

export default <Store.Actions>{
  async FETCH_CART({ commit }) {
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
  ADD_TO_CART(
    { commit, state, dispatch },
    {
      id,
      count,
      overflow = 'error',
    }: { id: Cart.ItemId; count: number; overflow?: 'error' | 'cut' }
  ) {
    if (state.cart.map(({ id }: { id: Cart.ItemId }) => id).includes(id)) {
      dispatch('CHANGE_ITEM_COUNT', { id, count, overflow });
    } else {
      commit('ADD_TO_CART', { id, count });
    }
  },
  CLEAR_CART({ dispatch }) {
    dispatch('SETUP_CART', []);
  },
  DELETE_ITEM({ commit }, id: Cart.ItemId) {
    commit('DELETE_ITEM', id);
  },
  CHANGE_ITEM_COUNT({ commit, getters }, { id, count, overflow = 'error' }) {
    const item = getters.CART.find(
      ({ id: _id }: { id: Cart.ItemId }) => _id === id
    );

    if (!item)
      return console.error('CHANGE_ITEM_COUNT: item === undefined', {
        id,
        count,
      });

    let sum = item.count + count;

    switch (overflow) {
      case 'error': {
        if (sum < 1)
          return console.error('CHANGE_ITEM_COUNT: sum < 0', { item });
        if (sum > 9)
          return console.error('CHANGE_ITEM_COUNT: sum > 9', { item });

        break;
      }

      case 'cut': {
        sum = sum > 9 ? 9 : sum < 1 ? 1 : sum;
      }
    }

    commit('CHANGE_ITEM_DATA', {
      id,
      data: { count: sum > 9 ? 9 : sum < 1 ? 1 : sum },
    });
  },
  DEC_ITEM_COUNT({ dispatch }, id: Cart.ItemId) {
    dispatch('CHANGE_ITEM_COUNT', {
      id,
      count: -1,
    });
  },
  INC_ITEM_COUNT({ dispatch }, id: Cart.ItemId) {
    dispatch('CHANGE_ITEM_COUNT', {
      id,
      count: 1,
    });
  },
  CHANGE_ITEM_DATA({ commit }, { id, data }: { id: Cart.ItemId; data: any }) {
    commit('CHANGE_ITEM_DATA', {
      id,
      data,
    });
  },
  BUY_ALL({ dispatch, getters }) {
    openWin({ coast: getters.CART_TOTAL_PRICE }, getters.CART_LENGTH, () => {
      dispatch('CLEAR_CART');
      dispatch('HIDE_CART');
    });
  },
};
