import { LocalStTool } from '../../js/LocalStTool.js';

const KEY = 'cart-items.v2';

const saveCart = (cart) => {
  LocalStTool._add(KEY, cart);

  return 1;
};

const loadCart = () => {
  return LocalStTool._get(KEY);
};

export default { saveCart, loadCart };
