import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/Home.vue';
// import store from '../store/index.js';

// const { dispatch } = store;

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '*',
      redirect: '/',
    },
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
