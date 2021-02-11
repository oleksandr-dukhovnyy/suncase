import Vue from 'vue'
import App from './App.vue'
import { Copy } from './js/CopyJS.js';

Copy._configurate({
  loggingMsg: false,
  loggingWarns: true,
  loggingErrors: true
});

Vue.config.productionTip = false;
Vue.config.silent = true;

new Vue({
  render: h => h( App )
}).$mount( '#app' );