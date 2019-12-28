import Vue from 'vue';

import '@/components/Dropdown/index';
import '@/components/Home/index';
import Alert from '@/components/Alert.vue';
import SelectDropdown from '@/components/SelectDropdown.vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import Pagination from '@/components/Pagination.vue';
import PoliticalParty from '@/components/PoliticalParty.vue';
import Politician from '@/components/Politician.vue';
import SideScroll from '@/components/SideScroll.vue';
import Tabs from '@/components/Tabs.vue';
import CountryList from '@/components/CountrySelector.vue';

Vue.component('our-alert', Alert);
Vue.component('our-navbar', Navbar);
Vue.component('our-footer', Footer);
Vue.component('our-pagination', Pagination);
Vue.component('our-political-party', PoliticalParty);
Vue.component('our-politician', Politician);
Vue.component('our-select-dropdown', SelectDropdown);
Vue.component('our-side-scroll', SideScroll);
Vue.component('our-tabs', Tabs);
Vue.component('our-country-selector', CountryList);
