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
                <our-political-party :party="politicalParty"></our-political-party>
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
import { politicalPartiesMock } from '../../constants/examples';

export default {
  name: 'political-parties',
  data() {
    return {
      filter: {
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
        console.log(politicalPartiesMock);
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
    nextPage() {
      this.filter.page += 1;
      this.getPoliticalParties();
    },
    previousPage() {
      this.filter.page -= 1;
      this.getPoliticalParties();
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
