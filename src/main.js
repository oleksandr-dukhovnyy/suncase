import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index.js';

// register Swiper custom elements
import { register } from 'swiper/element/bundle';
register();

import openPayWindow from './js/openPayWindow.js';
import 'normalize.css';
import 'animate.css';
// import { createHead } from '@vueuse/head';

// components
import TheButton from './components/General/TheButton.vue';
import Modal from './components/General/Modal.vue';
import SideModal from './components/General/SideModal.vue';
import Confirmation from './components/General/Confirmation.vue';

const app = createApp(App);

app.use(router);
app.use(store);
// app.use(createHead());

app.component('TheButton', TheButton);
app.component('Modal', Modal);
app.component('SideModal', SideModal);
app.component('Confirmation', Confirmation);

app.mixin({
  methods: {
    image(path) {
      return `${this.pathToImgs}/${path}`;
    },
    icon(name, ext = 'svg') {
      return this.image(`icons/${name}.${ext}`);
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
    email() {
      return 'script@vip-person.net';
    },
  },
});

app.mount('#app');
