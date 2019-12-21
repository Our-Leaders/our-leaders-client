<template>
  <div class="pr-10 lg:pr-64 xl:pr-64">
    <h3 class="text-4xl mb-8">Manage Subscriptions</h3>
    <our-labels :options="labels"></our-labels>
    <div class="w-full" v-for="(politician, i) in politicians" :key="i">
      <our-politician :politician="politician" view-type="secondary"></our-politician>
    </div>
  </div>
</template>

<script>
import labels from '../../../assets/json/politicalPositions.json';
import { politiciansMock } from '../../../constants/examples';

export default {
  name: 'manage-subscriptions',
  data() {
    return {
      labels: labels.politicalPositions,
      politicians: politiciansMock,
    };
  },
};
</script>

<style lang="scss">
</style>
