<template>
  <div>
    <!-- Header -->
    <div class="flex mb-4">
      <div class="w-4/5 relative mx-auto h-auto bg-primary bg-overlay-header">
        <div id="main-header" class="flex flex-wrap px-6 py-24 text-white text-center">
          <div class="ww-full md:w-1/2 lg:w-1/2 xl:w-1/2">
            <span class="text-6xl">Current leaders</span>
          </div>
          <div class="w-full md:w-1/2 lg:w-1/2 xl:w-1/2">
            <p class="text-left px-6">These are leaders who currently hold a political position in this government.
              The leaders in this category also have extensive experience in politics.</p>
          </div>
        </div>
        <our-tabs class="mb-6" v-on:change="setPrimary" :tabs='mainTabs' :tab-type="'primary'"></our-tabs>
      </div>
    </div>

    <!-- Search Body -->
    <div class="flex">
      <div class="w-4/5 relative mx-auto h-auto">
        <div class="flex flex-wrap flex-col-reverse lg:flex-row">
          <div class="w-full lg:w-2/3 pr-4">
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
                <our-politician :politician="politician" :total="politicians.length"></our-politician>
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
          <div class="w-full lg:w-1/3">
            <h3>Side Bar</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { politiciansMock } from '../../constants/examples';

export default {
  name: 'politicians',
  data() {
    return {
      filter: {
        status: 'current',
        politicalPosition: null,
        page: 0,
        limit: 10,
      },
      loading: true,
      mainTabs: [{ label: 'Current Leaders', value: 'current' }, { label: 'Aspirants', value: 'upcoming' }, { label: 'Past Leaders', value: 'past' }],
      politicians: [],
      politiciansServices: this.$serviceFactory.politicians,
      secondaryTabs: [{ label: 'All', value: null }, { label: 'Governors', value: 'governors' }, { label: 'Presidents', value: 'presidents' }],
      tab: 'current',
    };
  },
  created() {
    this.getPoliticians();
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
        // For now
        this.politicians = politiciansMock;
        this.politicians = this.politicians.concat(politiciansMock);
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.displayError(error);
      }
    },
    changePage(page) {
      this.filter.page = page;
      this.getPoliticians();
    },
    nextPage() {
      this.filter.page += 1;
      this.getPoliticians();
    },
    previousPage() {
      this.filter.page -= 1;
      this.getPoliticians();
    },
    setPrimary(value) {
      this.filter.status = value;
      this.getPoliticians();
    },
    setSecondary(value) {
      this.filter.politicalPosition = value;
      this.getPoliticians();
    },
  },
  computed: {
    total() {
      return this.politicians.length;
    },
  },
};
</script>

<style lang="scss">
</style>
