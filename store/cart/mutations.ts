// @ts-ignore
import bodyScroll from '../../js-utils/bodyScroll.js';
// @ts-ignore
import cartStorage from './saveToStorage.js';

const mutations: Store.Mutations<Cart.State> = {
  SETUP_CART(state: Cart.State, cartItems: Cart.CartItem[]) {
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
};

export default mutations;
