import Vue from 'vue';

import Money from 'v-money';
import Sticky from 'vue-sticky-directive';
import VueScrollTo from 'vue-scrollto';

Vue.use(Money);
Vue.use(Sticky);
Vue.use(VueScrollTo, {
  container: 'body',
  duration: 2000,
  easing: 'ease',
  offset: 0,
  force: true,
  cancelable: true,
});
