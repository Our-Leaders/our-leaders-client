import Vue from 'vue';
import Vuex from 'vuex';

import { authGetters, authMutations } from './authStore';
import { notificationActions, notificationMutations } from './notificationStore';
import { userGetters, userMutations } from './userStore';

Vue.use(Vuex);

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
  getters: Object.assign({}, authGetters, userGetters),
  mutations: Object.assign({}, authMutations, notificationMutations, userMutations),
  modules: {
  },
});
