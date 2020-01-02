import Vue from 'vue';

import TrendingPoliticians from '@/components/Home/TrendingPoliticians.vue';
import Subscription from '@/components/Home/Subscription.vue';
import Politicians from '@/components/Home/Politicians.vue';

Vue.component('our-trending-politicians', TrendingPoliticians);
Vue.component('our-subscription', Subscription);
Vue.component('our-home-politicians', Politicians);
