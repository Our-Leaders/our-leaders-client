import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';

import { authGetters, authMutations } from './authStore';
import { jobGetters, jobMutations } from './jobStore';
import { notificationActions, notificationMutations } from './notificationStore';
import { subscriptionGetters, subscriptionMutations } from './subscriptionStore';
import { userGetters, userMutations } from './userStore';
import { politicianGetters, politicianMutations } from './politicianStore';

Vue.use(Vuex);

const vuexPersist = new VuexPersist({
  key: 'our-leaders',
  storage: window.localStorage,
});

export default new Vuex.Store({
  state: {
    currentUser: null,
    viewedPoliticians: [],
    info: {
      header: null,
      details: null,
      display: false,
      displaySignUp: false,
      type: 'info',
    },
    job: null,
    jobs: null,
    jwtToken: '',
    subscription: null,
  },
  actions: Object.assign({}, notificationActions),
  getters: Object.assign({},
    authGetters,
    jobGetters,
    subscriptionGetters,
    userGetters,
    politicianGetters),
  mutations: Object.assign({},
    authMutations,
    jobMutations,
    notificationMutations,
    subscriptionMutations,
    userMutations,
    politicianMutations),
  plugins: [vuexPersist.plugin],
  modules: {
  },
});
