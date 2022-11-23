import Vue from 'vue';
import App from './App.vue';
import { Copy } from './js/CopyJS.js';
import store from './store';

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
  },
});

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
