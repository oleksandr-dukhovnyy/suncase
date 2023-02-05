import { createStore } from 'vuex';

import glasses from './glasses/glasses.js';
import cart from './cart/cart.js';
import slider from './slider/slider.js';

export default new createStore({
  modules: {
    glasses,
    cart,
    slider,
  },
});
