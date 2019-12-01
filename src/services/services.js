import axios from 'axios';
import dotenv from 'dotenv';

import router from '../router/index';
import store from '../store/index';

dotenv.config();

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 1000,
});

instance.interceptors.request.use((req) => {
  const request = req;
  const token = store.getters.jwt;

  if (token) {
    request.headers.Authorization = token;
  }

  return request;
});

instance.interceptors.response.use(response => response, (error) => {
  const reroute = error.response.status === 401;

  if (reroute) {
    store.commit('clearJWT');
    store.commit('clearUser');
    router.push('/auth/sign-in');
  }
  return Promise.reject(error);
});

export default instance;
