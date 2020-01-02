import Vue from 'vue';

import TrendingPolitician from '@/components/Home/TrendingPolitician.vue';
import Subscription from '@/components/Home/Subscription.vue';
import Politicians from '@/components/Home/Politicians.vue';

Vue.component('our-trending-politician', TrendingPolitician);
Vue.component('our-subscription', Subscription);
Vue.component('our-home-politicians', Politicians);