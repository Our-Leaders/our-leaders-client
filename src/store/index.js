import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';

import { authGetters, authMutations } from './authStore';
import { jobGetters, jobMutations } from './jobStore';
import { notificationActions, notificationGetters, notificationMutations } from './notificationStore';
import { subscriptionGetters, subscriptionMutations } from './subscriptionStore';
import { userGetters, userMutations } from './userStore';
import { politicalPartyActions, politicalPartyGetters, politicalPartyMutations } from './politicalPartyStore';
import { politicianGetters, politicianMutations } from './politicianStore';

Vue.use(Vuex);

const vuexPersist = new VuexPersist({
  key: 'our-leaders',
  storage: window.localStorage,
});

export default new Vuex.Store({
  state: {
    currentUser: null,
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
    notifications: [],
    politicalParty: null,
    subscription: null,
    viewedPoliticians: [],
  },
  actions: Object.assign({}, politicalPartyActions, notificationActions),
  getters: Object.assign({},
    authGetters,
    jobGetters,
    notificationGetters,
    subscriptionGetters,
    politicalPartyGetters,
    politicianGetters,
    userGetters),
  mutations: Object.assign({},
    authMutations,
    jobMutations,
    notificationMutations,
    subscriptionMutations,
    politicalPartyMutations,
    politicianMutations,
    userMutations),
  plugins: [vuexPersist.plugin],
  modules: {
  },
});
