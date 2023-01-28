import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/Home.vue';
import store from '../store/index.js';

const { dispatch } = store;

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
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ],
});

router.afterEach((to) => {
  if (/[gcb]-[a-z]{1,100}/i.test(to.hash)) {
    const [type, value] = to.hash.replace('#', '').split('-');

    const actionName = `glasses/TOGGLE_FILTER_${
      {
        g: 'GENDERS',
        c: 'CATEGORIES',
        b: 'BRANDS',
      }[type]
    }`;

    dispatch(actionName, value);
  }
});

export default router;
