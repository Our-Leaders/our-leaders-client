<template>
  <div class="pr-10 lg:pr-64 xl:pr-64">
    <h3 class="text-4xl mb-8">Manage Subscriptions</h3>
    <our-labels :options="labels" @changed="setFilter"></our-labels>

    <div class="flex flex-col justify-center mt-8" v-if="loading">
      <div class="w-full text-center">
        <span class="loading lg mx-auto mb-2"></span>
        <span>Loading Subscriptions...</span>
      </div>
    </div>

    <div v-if="!loading">
      <div class="w-full" v-for="(politician, i) in uniquePoliticians" :key="i">
        <our-politician :politician="politician"
          view-type="secondary"
          :subscriptions="politicianSubscriptions(politician.id)">
        </our-politician>
      </div>
    </div>

    <div class="w-full text-center my-4" v-if="isEmpty">
      <span>You are currently not subscribed to any politicians.</span>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import labels from '../../../assets/json/politicalPositions.json';

export default {
  name: 'manage-subscriptions',
  created() {
    this.getSubscriptions();
  },
  computed: {
    isEmpty() {
      return !this.loading && this.subscriptions.length === 0;
    },
    uniquePoliticians() {
      const subscriptionSet = new Set();
      const subscriptions = [];

      this.subscriptions.forEach((subscription) => {
        if (!subscriptionSet.has(subscription.politician.id)) {
          subscriptionSet.add(subscription.politician.id);
          subscriptions.push(subscription.politician);
        }
      });

      return subscriptions;
    },
  },
  data() {
    return {
      filter: {
        position: null,
      },
      labels: labels.politicalPositions,
      loading: true,
      subscriptions: [],
      subscriptionsServices: this.$serviceFactory.subscriptions,
    };
  },
  methods: {
    ...mapActions([
      'displayError',
    ]),
    async getSubscriptions() {
      try {
        this.loading = true;
        const response = await this.subscriptionsServices.getSubscriptions(this.filter);

        // Temporary till we can add type query to subscriptions
        this.subscriptions = response.data.subscriptions.filter(x => x.type !== 'newsletter');
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.displayError(error);
      }
    },
    politicianSubscriptions(id) {
      return this.subscriptions.filter(x => x.politician.id === id);
    },
    setFilter(value) {
      this.filter.position = value;
      this.getSubscriptions();
    },
  },
};
</script>

<style lang="scss">
</style>
