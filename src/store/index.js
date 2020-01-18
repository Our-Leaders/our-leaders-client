import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';

import { authGetters, authMutations } from './authStore';
import { jobGetters, jobMutations } from './jobStore';
import { notificationActions, notificationMutations } from './notificationStore';
import { userGetters, userMutations } from './userStore';

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
      type: 'info',
    },
    jwtToken: '',
  },
  actions: Object.assign({}, notificationActions),
  getters: Object.assign({}, authGetters, jobGetters, userGetters),
  mutations: Object.assign({}, authMutations, jobMutations, notificationMutations, userMutations),
  plugins: [vuexPersist.plugin],
  modules: {
  },
});
