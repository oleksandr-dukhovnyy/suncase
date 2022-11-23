import Vue from 'vue';
import Vuex from 'vuex';

import glasses from './glasses/glasses.js';
import cart from './cart/cart.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    glasses,
    cart,
  },
});
