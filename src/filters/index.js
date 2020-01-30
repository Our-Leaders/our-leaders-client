import Vue from 'vue';

import GetValue from './getValue';

Vue.filter('our-money', GetValue.money);
