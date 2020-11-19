import * as Sentry from '@sentry/browser';
import { Vue as VueIntegration } from '@sentry/integrations';
import { Integrations } from '@sentry/tracing';
import firebase from 'firebase';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import serviceFactory from './services/factory';
import store from './store';

import './components/index';
import './directives/index';
import './filters/index';
import './layouts/index';
import './main.css';
import './assets/styles/style.scss';

const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BACKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_ID,
};

firebase.initializeApp(firebaseConfig);

Sentry.init({
  dsn: process.env.VUE_APP_SENTRY_DSN,
  environment: process.env.VUE_APP_SENTRY_ENVIRONMENT ? process.env.VUE_APP_SENTRY_ENVIRONMENT : 'development',
  integrations: [
    new VueIntegration({
      Vue,
      tracing: true,
    }),
    new Integrations.BrowserTracing(),
  ],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

Vue.config.productionTip = false;

Vue.prototype.$firebase = firebase;
Vue.prototype.$serviceFactory = serviceFactory;
Vue.prototype.$sentry = Sentry;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
