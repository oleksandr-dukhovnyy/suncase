import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/Home.vue';
// import store from '../store/index.js';

// const { dispatch } = store;

const router = createRouter({
  history: createWebHistory(),
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/suncase',
      name: 'home',
      component: HomeView,
    },
    { path: '/:pathMatch(.*)*', name: 'not-found', redirect: { name: 'home' } },
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: () => import('../views/AboutView.vue')
    // }
  ],
});

// router.afterEach((from) => {

// });

export default router;
