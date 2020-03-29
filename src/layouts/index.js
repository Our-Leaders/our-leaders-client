import Vue from 'vue';

import AuthLayout from '@/layouts/Auth.vue';
import DefaultLayout from '@/layouts/Default.vue';
import NoFooter from '@/layouts/NoFooter.vue';
import NoNavbarLayout from '@/layouts/NoNavbar.vue';

Vue.component('auth-layout', AuthLayout);
Vue.component('default-layout', DefaultLayout);
Vue.component('no-footer-layout', NoFooter);
Vue.component('no-navbar-layout', NoNavbarLayout);
