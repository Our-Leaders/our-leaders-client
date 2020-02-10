import axios from 'axios';
import dotenv from 'dotenv';

// import router from '../router/index';
import store from '../store/index';

dotenv.config();

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 1000,
});

instance.interceptors.request.use((req) => {
  const request = req;
  const token = store.getters.jwt;

  if (token && !req.url.includes('jobs')) {
    request.headers.Authorization = token;
  }

  return request;
});

instance.interceptors.response.use(response => response, (error) => {
  const reroute = error.response.status === 401 || error.response.data.message === 'jwt expired';

  // Reroute to reauthentication from here if we choose to have a reauthentication endpoint

  if (reroute) {
    store.commit('clearJWT');
    store.commit('clearCurrentUser');
    store.dispatch('displaySignUp');
  }
  return Promise.reject(error);
});

export default instance;
