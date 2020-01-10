import Vue from 'vue';
import App from './App.vue';
import router from './router';
import serviceFactory from './services/factory';
import store from './store';

import './components/index';
import './directives/index';
import './layouts/index';
import './main.css';
import './assets/styles/style.scss';

Vue.config.productionTip = false;

Vue.prototype.$serviceFactory = serviceFactory;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
