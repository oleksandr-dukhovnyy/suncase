import Vue from 'vue';
import App from './App.vue';
import { Copy } from './js/CopyJS.js';
import store from './store';
import Scroll from './js/removeBodyScroll.js';
import openPayWindow from './js/openPayWindow.js';

Copy._configurate({
  loggingMsg: false,
  loggingWarns: true,
  loggingErrors: true,
});

Vue.config.productionTip = false;
Vue.config.silent = true;

Vue.mixin({
  methods: {
    openCart_() {
      this.$store.dispatch('cart/SET_SHOW', true);
    },
    closeCart_() {
      this.$store.dispatch('cart/SET_SHOW', false);
    },
    openModal_(id = null) {
      if (id !== null) {
        this.$store.dispatch('slider/SET_SELECTED', id);
      }

      this.$store.dispatch('slider/SET_SLIDER_SHOW', true);
    },
    closeModal_() {
      this.$store.dispatch('slider/SET_SLIDER_SHOW', false);
    },
    toggleModal_() {
      this.$store.dispatch('slider/TOGGLE_SLIDER_SHOW');
    },
    removeBodyScroll_() {
      Scroll.rem();
    },
    addBodyScroll_() {
      Scroll.add();
    },
    buyIt_(id) {
      const item = this.$store.getters[
        'glasses/UNFILTERED_SUNGLASESS_LIST'
      ].find((item) => item.id === id) || { coast: 0 };

      openPayWindow(
        {
          coast: item.coast,
          id,
        },
        1,
        () => {
          this.$store.dispatch('cart/HIDE_CART');

          if (item.id !== undefined) {
            this.$store.dispatch('cart/DELETE_ITEM', id);
          }
        }
      );
    },
    buyAll_() {
      openPayWindow(
        {
          coast: this.$store.getters['cart/CART_TOTAL_PRICE'],
          id: 'all',
        },
        this.$store.getters['cart/CART_LENGTH'],
        () => {
          this.$store.dispatch('cart/HIDE_CART');
          this.$store.dispatch('cart/CLEAR_CART');
        }
      );
    },
  },
  computed: {
    pathToImgs() {
      return './img';
    },
  },
});

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
