// @ts-ignore
import cartStorage from './saveToStorage.js';
// @ts-ignore
import bodyScroll from '~/helpers/bodyScroll.js';
// @ts-ignore
import openWin from '~/helpers/openPayWindow.js';

import { useGlassesStore } from '~/store/glasses';
import { defineStore } from 'pinia';

type CounteredGlassesItem = Cart.CartItem & Glasses.Item;

interface Store {
  cart: Cart.CartItem[];
  showCartPopup: boolean;
}

export const useCartStore = defineStore('cart', {
  actions: {
    async FETCH_CART() {
      const cloudCart = cartStorage.loadCart() || [];

      this.cart = cloudCart;

      cartStorage.saveCart(this.cart);
    },
    SETUP_CART(ids = []) {
      this.cart = ids;

      cartStorage.saveCart(this.cart);
    },
    SET_SHOW(value: boolean) {
      this.showCartPopup = value;

      bodyScroll.balancedSet(value);
    },
    HIDE_CART() {
      this.SET_SHOW(false);
    },
    SHOW_CART() {
      this.SET_SHOW(true);
    },
    ADD_TO_CART({
      id,
      count = 1,
      overflow = 'error',
    }: {
      id: Cart.CartItem['id'];
      count: number;
      overflow?: 'error' | 'cut';
    }) {
      if (this.cart.find(({ id: _id }) => _id === id)) {
        changeItemCount.call(this, {
          id,
          count,
          overflow,
        });
      } else {
        this.cart.push({ id, count });
      }

      cartStorage.saveCart(this.cart);
    },
    CLEAR_CART() {
      this.cart = [];

      cartStorage.saveCart(this.cart);
    },
    DELETE_ITEM(id: Cart.CartItem['id']) {
      this.cart = this.cart.filter(({ id: _id }) => _id !== id);
    },
    DEC_ITEM_COUNT(id: Cart.CartItem['id']) {
      changeItemCount.call(this, {
        id,
        count: -1,
      });

      cartStorage.saveCart(this.cart);
    },
    INC_ITEM_COUNT(id: Cart.CartItem['id']) {
      changeItemCount.call(this, {
        id,
        count: 1,
      });

      cartStorage.saveCart(this.cart);
    },
    BUY_ALL() {
      openWin({ coast: this.CART_TOTAL_PRICE }, this.CART_LENGTH, () => {
        this.CLEAR_CART();
        this.HIDE_CART();
      });
    },
  },
  state: (): Store => ({
    cart: [],
    showCartPopup: false,
  }),
  getters: {
    CART: (state): CounteredGlassesItem[] => {
      const glassesStore = useGlassesStore();

      return glassesStore.UNFILTERED_SUNGLASSES_LIST.filter(
        (item: Glasses.Item) => state.cart.some(({ id }) => item.id === id)
      ).map((item: Glasses.Item): CounteredGlassesItem => {
        return {
          ...item,
          count: state.cart.find(({ id }) => item.id === id)?.count || 0,
        };
      });
    },

    CART_LENGTH(): number {
      return this.CART.reduce(
        (acc: number, curr: CounteredGlassesItem) => acc + curr.count,
        0
      );
    },

    CART_TOTAL_PRICE(): number {
      return this.CART.reduce(
        (a: number, c: CounteredGlassesItem) => a + c.coast * c.count,
        0
      );
    },

    SHOW_CART_POPUP: (state) => state.showCartPopup,
  },
});

function changeItemCount(this: Store, { id, count, overflow = 'error' }) {
  const item = this.cart.find(({ id: _id }) => _id === id);

  if (!item)
    return console.error('CHANGE_ITEM_COUNT: item === undefined', {
      id,
      count,
    });

  let sum = item.count + count;

  switch (overflow) {
    case 'error': {
      if (sum < 1) return console.error('CHANGE_ITEM_COUNT: sum < 0', { item });
      if (sum > 9) return console.error('CHANGE_ITEM_COUNT: sum > 9', { item });

      setCounter.call(this, id, sum);

      break;
    }

    case 'cut': {
      console.log('here');

      setCounter.call(this, id, sum > 9 ? 9 : sum < 1 ? 1 : sum);
    }
  }
}

function setCounter(this: Store, id: Cart.CartItem['id'], count: number) {
  this.cart = this.cart.map((item) => {
    return {
      ...item,
      count: item.id === id ? count : item.count,
    };
  });
}

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));
