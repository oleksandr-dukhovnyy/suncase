import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index.js';

import openPayWindow from './js/openPayWindow.js';
import 'normalize.css';
import 'animate.css';

import TheButton from './components/General/TheButton.vue';

const app = createApp(App);

app.use(router);
app.use(store);

app.component('TheButton', TheButton);
app.mixin({
  methods: {
    image(path) {
      return `${this.pathToImgs}/${path}`;
    },
    openPayWindow,
  },
  computed: {
    pathToImgs() {
      return './img';
    },
    phone() {
      return '+38 063 244 1587';
    },
  },
});

app.mount('#app');
