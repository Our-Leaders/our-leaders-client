<template>
  <div>
    <!-- Header -->
    <div class="flex mb-4">
      <div class="w-4/5 relative mx-auto h-auto bg-primary bg-overlay-header">
        <div id="main-header" class="flex flex-wrap px-6 py-24 text-white text-center">
          <div class="w-full md:w-1/2 lg:w-1/2 xl:w-1/2">
            <span class="text-6xl">Political Parties</span>
          </div>
          <div class="w-full md:w-1/2 lg:w-1/2 xl:w-1/2">
            <p class="text-left px-6">These are the political parties registered under the federal republic of Nigeria.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Search Body -->
    <div class="flex">
      <div class="w-4/5 relative mx-auto h-auto">
        <div class="flex flex-wrap flex-col-reverse lg:flex-row">
          <div class="w-full lg:w-2/3 pr-4">
            <!-- Loading div -->
            <div class="flex mb-4">
              <div class="w-full" v-if="loading">
                <span class="loading lg mx-auto"></span>
              </div>
            </div>
            <!-- Main div -->
            <!-- Might turn this into a component later -->
            <div class="flex flex-wrap mb-4 min-h-64" v-if="!loading">
              <div class="w-1/2 md:w-2/6 my-6 px-2" v-for="(politicalParty, i) in politicalParties" :key="i">
                <our-political-party :party="politicalParty" @click="navigateTo"></our-political-party>
              </div>
            </div>
            <!-- Pagination -->
            <div class="block mb-2" v-if="!loading">
              <our-pagination
              v-on:change="changePage"
              v-on:next="nextPage"
              v-on:previous="previousPage"
              :total="total"
              :current="filter.page"></our-pagination>
            </div>
          </div>
          <div class="w-full lg:w-1/3 relative">
            <button class="lg:hidden xl:hidden py-1 px-2" @click="toggleMenu">
              <img class="h-4 inline-block mr-1" src="../../assets/img/filter.svg"/>
              <span class="align-middle">Filter</span>
            </button>
            <transition name="fade" mode="out-in">
              <div class="hidden lg:flex xl:flex flex-wrap mt-3"
                :class="{ 'flex md:flex': displayMenu }">
                <div class="w-9/12 inline-block">
                    <input class="field w-full mt-1 py-2 pl-2"
                      :class="{ 'inactive': isEmpty(filter.name) }"
                      type="text"
                      id="query"
                      name="query"
                      placeholder="Search party name"
                      v-model="filter.name"/>
                </div>
                <div class="w-3/12 inline-block pl-4">
                  <button
                    class="btn-grey-outline py-2 lg:py-0 xl:py-0 w-full h-full"
                    :disabled="loading"
                    @click="getPoliticalParties">
                    Search
                  </button>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { politicalPartiesMock } from '../../constants/examples';
import ValidatorUtil from '../../helpers/validatorUtil';

export default {
  name: 'political-parties',
  data() {
    return {
      displayMenu: false,
      filter: {
        name: null,
        page: 0,
        limit: 10,
      },
      loading: true,
      politicalParties: [],
      politicalPartiesServices: this.$serviceFactory.politicalParties,
    };
  },
  created() {
    this.getPoliticalParties();
  },
  methods: {
    ...mapActions([
      'displayError',
    ]),
    async getPoliticalParties() {
      try {
        this.loading = true;
        const response = await this.politicalPartiesServices.getPoliticalParties(this.filter);

        this.politicalParties = response.data.politicalParties;
        // For now
        this.politicalParties = politicalPartiesMock;
        this.politicalParties = this.politicalParties.concat(politicalPartiesMock);
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.displayError(error);
      }
    },
    changePage(page) {
      this.filter.page = page;
      this.getPoliticalParties();
    },
    isEmpty(value) {
      return !ValidatorUtil.isDefined(value);
    },
    navigateTo(id) {
      this.$router.push(`/political-parties/${id}`);
    },
    nextPage() {
      this.filter.page += 1;
      this.getPoliticalParties();
    },
    previousPage() {
      this.filter.page -= 1;
      this.getPoliticalParties();
    },
    toggleMenu() {
      this.displayMenu = !this.displayMenu;
    },
  },
  computed: {
    total() {
      return this.politicalParties.length;
    },
  },
};
</script>

<style lang="scss">
</style>
