import Vue from 'vue';

import Cloudinary, { CldImage, CldTransformation } from 'cloudinary-vue';
import Croppa from 'vue-croppa';
import checkView from 'vue-check-view';
import Money from 'v-money';
import Sticky from 'vue-sticky-directive';
import twitter from 'vue-twitter';
import VueScrollTo from 'vue-scrollto';
import VueShareSocial from 'vue-share-social';

import 'vue-croppa/dist/vue-croppa.css';


Vue.use(Cloudinary, {
  configuration: {
    cloudName: process.env.VUE_APP_CLOUDINARY_NAME,
    components: {
      CldImage,
      CldTransformation,
    },
  },
});
Vue.use(Croppa);
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
