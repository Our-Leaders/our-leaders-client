import Vue from 'vue';

import DefaultLayout from '@/layouts/Default.vue';
import NoNavbarLayout from '@/layouts/NoNavbar.vue';
import NoFooter from '@/layouts/NoFooter.vue';

Vue.component('default-layout', DefaultLayout);
Vue.component('no-footer-layout', NoFooter);
Vue.component('no-navbar-layout', NoNavbarLayout);
