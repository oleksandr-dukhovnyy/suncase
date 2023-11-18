import Vuex from 'vuex';
import glasses from './glasses';
import cart from './cart';
import slider from './slider';

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  devtools: process.env.NODE_ENV !== 'production',
  modules: {
    glasses,
    cart,
    slider,
  },
});
