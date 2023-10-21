import { createApp } from 'vue';
// import * as Sentry from '@sentry/vue';
import App from './App.vue';
import router from './router';
import store from './store/index';

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
    pathToImgs: () => './img',
    phone: () => '+38 063 244 1587',
    email: () => 'script@vip-person.net',
  },
});

// Sentry.init({
//   Vue: app,
//   dsn: '-',
//   integrations: [
//     new Sentry.BrowserTracing({
//       // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
//       tracePropagationTargets: [location.origin, 'https:yourserver.io/api/'],
//       routingInstrumentation: Sentry.vueRouterInstrumentation(router),
//     }),
//     new Sentry.Replay(),
//   ],
//   tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
//   // Session Replay
//   replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
//   replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
// });

app.mount('#app');
