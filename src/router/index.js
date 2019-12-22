import Vue from 'vue';
import VueRouter from 'vue-router';

import Pages from '../views/index';
import Store from '../store/index';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Pages.Home,
  },
  {
    path: '/auth/sign-in',
    name: 'sign-in',
    component: Pages.SignIn,
    meta: {
      isAuth: true,
      layout: 'no-navbar',
    },
  },
  {
    path: '/auth/sign-up',
    name: 'sign-up',
    component: Pages.SignUp,
    meta: {
      isAuth: true,
      layout: 'no-navbar',
    },
  },
  {
    path: '/accounts',
    component: Pages.AccountsDefault,
    meta: {
      requiresAuth: true,
      layout: 'no-footer',
    },
    children: [{
      path: '/',
      name: 'account-home',
      component: Pages.AccountsBasic,
    }, {
      path: '*',
      redirect: { name: 'account-home' },
    }],
  },
  {
    path: '/politicians/:politicianId',
    name: 'politician',
    component: Pages.Politician,
    props: true,
  },
  {
    path: '/politicians',
    name: 'politicians',
    component: Pages.Politicians,
  },
  {
    path: '/political-parties',
    name: 'political-parties',
    component: Pages.PoliticalParties,
  },
  {
    path: '*',
    redirect: { name: 'home' },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.isAuth && Store.getters.isLoggedIn) {
    next(from.path);
  } else if (to.matched.some(m => m.meta.requiresAuth) && !Store.getters.isLoggedIn) {
    next('home');
  } else {
    next();
  }
});

export default router;
