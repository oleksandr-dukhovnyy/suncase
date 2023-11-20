import { LocalStTool } from '~/helpers/LocalStTool';

const KEY = 'cart-items.v2';

export default {
  saveCart(cart: Cart.State['cart']) {
    LocalStTool._add(KEY, cart);

    return 1;
  },
  loadCart() {
    return LocalStTool._get(KEY);
  },
};
