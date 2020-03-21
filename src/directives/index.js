import Vue from 'vue';

import checkView from 'vue-check-view';
import Money from 'v-money';
import Sticky from 'vue-sticky-directive';
import twitter from 'vue-twitter';
import VueScrollTo from 'vue-scrollto';
import VueShareSocial from 'vue-share-social';


Vue.use(checkView);
Vue.use(Money);
Vue.use(Sticky);
Vue.use(twitter);
Vue.use(VueScrollTo, {
  container: 'body',
  duration: 2000,
  easing: 'ease',
  offset: 0,
  force: true,
  cancelable: true,
});
Vue.use(VueShareSocial);
