import Pages from '../views/index';

export default {
  path: '/accounts',
  component: Pages.AccountsDefault,
  meta: {
    requiresAuth: true,
    layout: 'no-footer',
  },
  children: [{
    path: 'basic',
    name: 'account-home',
    component: Pages.AccountsBasic,
  }, {
    path: 'subscriptions',
    name: 'account-subscriptions',
    component: Pages.AccountsSubscription,
  }, {
    path: 'votes',
    name: 'account-votes',
    component: Pages.AccountsVotes,
  }, {
    path: '*',
    redirect: { name: 'account-home' },
  }],
};
