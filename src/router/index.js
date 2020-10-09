import Vue from 'vue';
import VueRouter from 'vue-router';

import AccountRoutes from './accountRoutes';
import Pages from '../views/index';
import Store from '../store/index';
import ServiceFactory from '../services/factory';

Vue.use(VueRouter);

const routes = [
  AccountRoutes,
  {
    path: '/',
    name: 'home',
    component: Pages.Home,
    meta: {
      shrinkMode: true,
    },
  },
  {
    path: '/',
    name: 'home',
    component: Pages.Home,
    meta: {
      shrinkMode: true,
    },
  },
  {
    path: '/coming-soon',
    name: 'coming-soon',
    component: Pages.Politician,
    meta: {
      layout: 'coming-soon',
    },
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
    path: '/auth/reset-password',
    name: 'reset-password',
    component: Pages.ResetPassword,
    meta: {
      isAuth: true,
      layout: 'no-navbar',
    },
  },
  {
    path: '/about-us',
    name: 'about-us',
    component: Pages.AboutUs,
  },
  {
    path: '/careers',
    name: 'careers',
    component: Pages.Careers,
  },
  {
    path: '/careers/apply',
    name: 'careers-apply',
    component: Pages.Career,
  },
  {
    path: '/contact-us',
    name: 'contact-us',
    component: Pages.ContactUs,
  },
  {
    path: '/donate',
    name: 'donate',
    component: Pages.Donate,
  },
  {
    path: '/faqs',
    name: 'faqs',
    component: Pages.Faqs,
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: Pages.Privacy,
  },
  {
    path: '/terms',
    name: 'terms',
    component: Pages.Terms,
  },
  {
    path: '/leaders/:politicianId',
    name: 'politician',
    component: Pages.Politician,
    props: true,
  },
  {
    path: '/leaders',
    name: 'politicians',
    component: Pages.Politicians,
  },
  {
    path: '/political-parties',
    name: 'political-parties',
    component: Pages.PoliticalParties,
  },
  {
    path: '/political-parties/:politicalPartyId',
    name: 'political-party',
    component: Pages.PoliticalParty,
    props: true,
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
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

router.beforeResolve(async (to, from, next) => {
  try {
    await ServiceFactory.statistics
      .recordVisit({ referrer: from.path, url: to.path, title: to.name });
  } finally {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (to.meta.shrinkMode) {
    Store.dispatch('setShrinkMode', to.meta.shrinkMode);
  } else {
    Store.dispatch('setShrinkMode', false);
  }

  if (process.env.VUE_APP_COMING_SOON === 'true' && to.name !== 'coming-soon') {
    next('coming-soon');
  } else if (to.matched.some(m => m.meta.requiresAuth) && !Store.getters.isLoggedIn) {
    next('home');
  } else if (Store.getters.isLoggedIn && !to.meta.isAuth && !Store.getters.user.isEmailVerified) {
    next('/auth/sign-up?signedIn=true');
  } else {
    next();
  }
});

export default router;
