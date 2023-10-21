// store.ts
import { createStore } from 'vuex';

import glasses from './glasses';
import cart from './cart';
import slider from './slider';

export default createStore({
  modules: {
    glasses,
    cart,
    slider,
  },
});
