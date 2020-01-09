import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';

import { authGetters, authMutations } from './authStore';
import { notificationActions, notificationMutations } from './notificationStore';
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
      type: 'info',
    },
    jwtToken: '',
  },
  actions: Object.assign({}, notificationActions),
  getters: Object.assign({}, authGetters, userGetters, politicianGetters),
  mutations: Object.assign({},
    authMutations,
    notificationMutations,
    userMutations,
    politicianMutations),
  plugins: [vuexPersist.plugin],
  modules: {
  },
});
