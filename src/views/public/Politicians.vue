<template>
  <div class="h-full">
    <!-- Header -->
    <div class="flex mb-4 z-10">
      <div class="w-full lg:w-4/5 xl:w-4/5 relative mx-auto h-auto bg-primary bg-overlay-header">
        <div id="main-header" class="flex flex-wrap px-6 py-24 text-white text-center">
          <div class="ww-full md:w-1/2 lg:w-1/2 xl:w-1/2">
            <span class="text-6xl" v-if="filter.status === 'current'">Current leaders</span>
            <span class="text-6xl" v-if="filter.status === 'upcoming'">Aspirants</span>
            <span class="text-6xl" v-if="filter.status === 'past'">Past Leaders</span>
          </div>
          <div class="w-full md:w-1/2 lg:w-1/2 xl:w-1/2">
            <p class="text-left px-6" v-if="filter.status === 'current'">This section covers every leader who currently holds a political position, whether by appointment or election.</p>
            <p class="text-left px-6" v-if="filter.status === 'upcoming'">This section covers every political aspirant who is currently contesting for a leadership position.</p>
            <p class="text-left px-6" v-if="filter.status === 'past'">This section covers every leader who once held a political position, whether by appointment or election since January 2020.</p>
          </div>
        </div>
        <our-tabs class="mb-6" ref="primaryTab" :default-value="filter.status" v-on:change="setPrimary" :tabs='mainTabs' :tab-type="'primary'"></our-tabs>
      </div>
    </div>

    <!-- Search Body -->
    <div class="flex">
      <div class="w-11/12 lg:w-4/5 xl:w-4/5 relative mx-auto h-auto">
        <div class="flex flex-wrap flex-col-reverse lg:flex-row">
          <div class="w-full lg:w-2/3 xl:w-2/3 lg:pr-4 xl:pr-4">
          <!-- Secondary Tab -->
            <our-tabs class="mb-6" v-on:change="setSecondary" :tabs='secondaryTabs' :tab-type="'secondary'"></our-tabs>
            <!-- Loading div -->
            <div class="flex mb-4">
              <div class="w-full" v-if="loading">
                <span class="loading lg mx-auto"></span>
              </div>
            </div>
            <!-- Main div -->
            <!-- Might turn this into a component later -->
            <div class="flex flex-wrap mb-4 min-h-64" v-if="!loading">
              <div class="w-1/2 md:w-2/6 my-6 px-2" v-for="(politician, i) in politicians" :key="i">
                <our-politician :politician="politician" :total="politicians.length" @click="navigateTo"></our-politician>
              </div>
            </div>
            <div class="w-full text-center mt-4 mb-8" v-if="noMatch">
              <span>Sorry, there are no politicians matching your search.</span>
            </div>
            <!-- Pagination -->
            <div class="block mb-2" v-if="!loading && total > 0">
              <our-pagination
              v-on:change="changePage"
              v-on:next="nextPage"
              v-on:previous="previousPage"
              :limit="filter.limit"
              :total="total"
              :current="filter.skip"></our-pagination>
            </div>
          </div>

          <!-- Side Bar -->
          <div class="w-full lg:w-1/3 xl:w-1/3 relative">
            <div class="flex flex-wrap mt-3">
              <div class="w-9/12 inline-block">
                <input class="field w-full mt-1 py-2 pl-2"
                  :class="{ 'inactive': isEmpty(filter.name) }"
                  type="text"
                  id="query"
                  name="query"
                  placeholder="Search by name"
                  v-model="filter.name"/>
              </div>
              <div class="w-3/12 inline-block pl-4">
                <button
                  class="btn-grey-outline py-2 lg:py-0 xl:py-0 w-full h-full"
                  :disabled="loading"
                  @click="getPoliticians">
                  Search
                </button>
              </div>
              <div class="w-full mt-2 text-center lg:hidden xl:hidden" @click="toggleMenu">
                <small v-if="!displayMenu">More search options</small>
                <img v-if="!displayMenu" class="ml-2 inline" src="@/assets/img/chevron-down.svg"/>
                <small v-if="displayMenu">Less search options</small>
                <img v-if="displayMenu" class="ml-2 inline" src="@/assets/img/chevron-up.svg"/>
              </div>
            </div>
            <transition name="fade" mode="out-in">
              <div class="flex lg:flex xl:flex flex-wrap mt-3 mb-20"
                :class="{ 'hidden': !displayMenu }">
                <div class="w-full my-10">
                  <div class="w-full horizontal-divide">
                    <span>Or search by</span>
                  </div>
                </div>
                <div class="w-full mb-5 relative">
                  <our-select-dropdown
                    label="Political party"
                    :options="politicalParties"
                    field="politicalPartyId"
                    @change="setFilter"></our-select-dropdown>
                </div>
                <div class="w-full mb-8 relative">
                  <our-select-dropdown
                    label="State"
                    :options="states"
                    field="state"
                    @change="setFilter"></our-select-dropdown>
                </div>
                <div class="w-full mb-4">
                  <button
                    class="btn-grey-outline w-full py-3"
                    :disabled="loading"
                    @click="getPoliticians">
                    Search
                  </button>
                </div>
              </div>
            </transition>
            <div class="relative hidden lg:block xl:block">
              <div class="block w-28 h-28 absolute z-10" id="politician-block">
                <span class="inline-block h-1 w-1 mx-2 bg-primary" v-for="index in 20" :key="index"></span>
              </div>
              <div class="flex flex-wrap relative bg-gray-100 py-10 px-6 mb-10 z-20">
                <our-subscription :full="true" :text="'Join'">
                  <p class="subscribe-text text-4xl leading-none"><span class="text-primary">Stay up to date</span><br/> with everything we're working on</p>
                  <p class="text-base leading my-6">Join the Mailing List and we’ll send you an email once a month to update you on new developments.</p>
                </our-subscription>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="block lg:hidden xl:hidden w-full mb-16 mt-6">
      <div class="w-full bg-gray-100 py-10 px-6">
        <our-subscription :full="true" :text="'Join'">
          <p class="subscribe-text text-4xl leading-none"><span class="text-primary">Stay up to date</span><br/>with everything we're working on</p>
          <p class="text-base leading my-6">Join the Mailing List and we’ll send you an email once a month to update you on new developments.</p>
        </our-subscription>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import states from '../../assets/json/states.json';
import ValidatorUtil from '../../helpers/validatorUtil';

export default {
  name: 'politicians',
  data() {
    return {
      displayMenu: false,
      filter: {
        limit: 12,
        name: null,
        skip: 0,
        politicalPartyId: null,
        state: null,
        status: this.$route.query.status || 'current',
      },
      loading: true,
      mainTabs: [{ label: 'Current Leaders', value: 'current' }, { label: 'Aspirants', value: 'upcoming' }, { label: 'Past Leaders', value: 'past' }],
      politicalParties: [],
      politicalPartiesServices: this.$serviceFactory.politicalParties,
      politicians: [],
      politiciansServices: this.$serviceFactory.politicians,
      processing: false,
      states: states.states,
      secondaryTabs: [{ label: 'All', value: null }, { label: 'Governors', value: 'governor' }, { label: 'Presidents', value: 'president' }],
      subscribeEmail: null,
      tab: 'current',
      total: 0,
    };
  },
  created() {
    if (this.$route.query.search) {
      this.filter.name = this.$route.query.search;
    }

    this.getPoliticians();
    this.getPoliticalParties();
  },
  beforeRouteUpdate(to, from, next) {
    this.setPrimary(to.query.status || 'current');
    this.$refs.primaryTab.setTab(to.query.status || 'current');
    next();
  },
  methods: {
    ...mapActions([
      'displayError',
    ]),
    async getPoliticians() {
      try {
        this.loading = true;
        const response = await this.politiciansServices.getPoliticians(this.filter);

        this.politicians = response.data.politicians;
        this.total = response.data.total;
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.displayError(error);
      }
    },
    async getPoliticalParties() {
      try {
        const response = await this.politicalPartiesServices.getPoliticalParties({});

        this.politicalParties = response.data.politicalParties.map(option => Object({
          label: option.name,
          value: option.id,
          name: option.name,
          acronym: option.acronym,
          country: option.country,
          createdAt: option.createdAt,
        }));
      } catch (error) {
        this.politicalParties = [];
      }
    },
    changePage(page) {
      this.filter.skip = page;
      this.getPoliticians();
    },
    isEmpty(value) {
      return !ValidatorUtil.isDefined(value);
    },
    navigateTo(id) {
      this.$router.push(`/politicians/${id}`);
    },
    nextPage() {
      this.filter.skip += 1;
      this.getPoliticians();
    },
    previousPage() {
      this.filter.skip -= 1;
      this.getPoliticians();
    },
    setFilter(key, value) {
      this.filter[key] = value;
    },
    setPrimary(value) {
      this.filter.status = value;
      this.changePage(0);
    },
    setSecondary(value) {
      this.filter.politicalPosition = value;
      this.changePage(0);
    },
    toggleMenu() {
      this.displayMenu = !this.displayMenu;
    },
  },
  computed: {
    noMatch() {
      return !this.loading && this.total === 0;
    },
  },
};
</script>

<style lang="scss">
#politician-block {
  right: 0;
  top: 0;
  transform: translateX(50px) translateY(-30px);
}
</style>
