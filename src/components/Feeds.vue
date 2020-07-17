<template>
  <div class="pr-4">
    <div v-for="(item, i) in keys" :key="i" class="mt-4">
      <div v-for="(month, ind) in item.months" :key="ind" class="mb-10">
        <div class="flex justify-between items-center mb-1" :id="`scroll_feeds_${month}${item.year}`">
          <p class="font-circular text-xl font-semibold capitalize">{{monthsList[month]}} {{item.year}}</p>
        </div>
        <div v-for="(details, index) of data[item.year][month]" :key="index" class="quarter-view-accomplishment border-t border-gray-db relative block">
          <input type="checkbox" :name="`${item.year}_${month}_${index}`" :id="`${item.year}_${month}_${index}`" class="invisible absolute">
          <label :for="`${item.year}_${month}_${index}`">
            <header class="py-3 cursor-pointer">
              <div class="relative flex justify-between items-center">
                <span class="font-semibold capitalize font-circular max-w-2/3">{{details.title}}</span>
                <span class="flex">
                  <span class="text-xs text-gray-96 font-circular mr-2">Published {{details.publishedAt | our-date}}</span>
                  <img src="@/assets/img/chevron-down.svg" alt="chevron-down">
                </span>
              </div>
            </header>
          </label>
          <div class="mb-4 pr-12 quarter-view-accomplishment-detail">
            <!-- image here -->
            <p v-html="details.summary"></p>
            <small class="text-gray-600">View full story at <a :href="details.feedUrl" target="_blank">{{getUrlHost(details.feedUrl)}}</a></small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import monthsList from '@/assets/json/months.json';
import StringUtil from '@/helpers/stringUtil';

export default {
  name: 'feeds',
  props: {
    data: {
      type: Object,
      required: true,
    },
    keys: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      monthsList,
    };
  },
  methods: {
    getUrlHost(url) {
      return StringUtil.getUrlHost(url);
    },
  },
};
</script>

<style lang="scss">
</style>
