import Vue from 'vue';

import Alert from '@/components/Alert.vue';
import Navbar from '@/components/Navbar.vue';
import CountryList from '@/components/CountrySelector.vue';

Vue.component('our-alert', Alert);
Vue.component('our-navbar', Navbar);
Vue.component('our-country-selector', CountryList);
