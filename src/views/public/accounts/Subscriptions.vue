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
      <div class="w-full" v-for="(subscription, i) in subscriptions" :key="i">
        <our-politician :politician="subscription.politician"
          view-type="secondary"
          :subscribed="isSubscribed(subscription.politician.id)"></our-politician>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import labels from '../../../assets/json/politicalPositions.json';
import { politiciansMock } from '../../../constants/examples';

export default {
  name: 'manage-subscriptions',
  created() {
    this.getSubscriptions();
  },
  data() {
    return {
      filter: {
        position: null,
      },
      labels: labels.politicalPositions,
      loading: true,
      politicians: politiciansMock,
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

        this.subscriptions = response.data.subscriptions;
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.displayError(error);
      }
    },
    isSubscribed(id) {
      return this.subscriptions.findIndex(x => x.politician.id === id) > -1;
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