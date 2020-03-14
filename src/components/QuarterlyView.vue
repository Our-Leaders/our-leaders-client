<template>
  <div>
    <!-- Yearly View -->
    <div v-if="isDefined && isYearly" class="relative">
      <button
        v-for="tag in yearInfo.tags"
        :key="tag"
        class="mt-2 inline-block text-xs py-1 px-3 btn-grey-outline mr-2 capitalize"
        @click="sortByTags(tag)">
        {{tag}}
      </button>
      <div v-for="year in keys" :key="year.value" class="mb-4 relative">
        <span class="absolute right-0 top-0 text-xs mt-2 mr-4">{{yearInfo.total}} accomplishments</span>
        <h3 class="my-2">
          <span class="font-label text-xl font-semibold">{{year.label}}</span>
        </h3>
        <div class="flex flex-wrap">
          <div class="w-1/2 pr-4" v-for="quarter in quarters" :key="quarter.key">
            <div class="border-2 border-gray-200 mb-4">
              <h3 class="leading-full align-middle py-3">
                <span class="font-label font-semibold px-2">{{quarter.displayName}}</span>
                <span class="text-xs text-gray-500 float-right mr-2">{{`${quarter.period} ${year.label}`}}</span>
              </h3>
              <div v-if="isValid(data[year.label][quarter.key])" @click="selectQuarter(quarter, year.label, data[year.label])">
                <h3 class="py-2 px-2 border-t-2 border-gray-200 hover:bg-gray-200 cursor-pointer" v-for="(item, index) in data[year.label][quarter.key].slice(0, 3)" :key="`${year.label}_${quarter.key}_${index}`">{{item.title}}</h3>
                <h3 class="py-2 px-2 border-t-2 border-gray-200 hover:bg-gray-200 cursor-pointer relative" v-show="data[year.label][quarter.key].length > 3">
                  <span class="text-xs">View {{data[year.label][quarter.key].length - 3}} more</span>
                  <img class="absolute bottom-0 right-0 top-0 my-4 mr-2 h-3" src="@/assets/img/long-right-arrow.svg"/>
                </h3>
              </div>
              <div v-else>
                <h3 class="py-2 px-2 border-t-2 border-gray-200">No accomplishments in this quarter.</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quarterly View -->
    <div v-if="isQuarterly" class="pr-4">
      <div class="mb-2">
        <button class="py-1 flex justify-between items-center font-circular text-xs text-gray-96" @click.once="goToYearView">
          <img class="h-4" src="@/assets/img/chevron-left.svg" alt="chevron-left">
          <span class="ml-1">Back to yearly view</span>
        </button>
      </div>

      <div v-for="(quarter, i) in selectedQuarters.keys" :key="i" class="mb-6">
        <div class="flex justify-between items-center mb-1">
          <p class="font-circular text-xl font-semibold capitalize">{{quarter}} {{selectedQuarters.year}}</p>
          <span class="text-xs font-circular">{{selectedQuarters.data[quarter].length}} accomplishment{{selectedQuarters.data[quarter].length > 1 ? 's' : ''}}</span>
        </div>
        <div v-for="(accomplishment, index) of selectedQuarters.data[quarter]" :key="index" class="quarter-view-accomplishment border-t border-gray-db relative block">
          <input type="checkbox" :name="`${quarter}_${index}`" :id="`${quarter}_${index}`" class="invisible absolute">
          <label :for="`${quarter}_${index}`">
            <header class="py-3 cursor-pointer">
              <div class="relative flex justify-between items-center">
                <span class="font-semibold capitalize font-circular">{{accomplishment.title}}</span>
                <span class="flex">
                  <span class="text-xs text-gray-96 font-circular mr-2">Published {{accomplishment.createdOn | our-date}}</span>
                  <img src="@/assets/img/chevron-down.svg" alt="chevron-down">
                </span>
              </div>
              <div class="tags mt-2">
                <div v-for="tag in accomplishment.tags" :key="`${quarter}_${tag}`" class="inline-block tag text-xs font-circular py-1 px-3 border border-gray-db mr-2 capitalize">
                  {{tag}}
                </div>
              </div>
            </header>
          </label>
          <div class="mb-4 pr-12 quarter-view-accomplishment-detail">
            <!-- image here -->
            <div class="w-full h-48 mb-4 bg-gray-db bg-cover bg-center" v-if="accomplishment.image && accomplishment.image.url" :style="{ 'background-image': 'url('+ accomplishment.image.url +')'  }"></div>
            <p class="">{{accomplishment.description}}</p>
            <p v-if="accomplishment.url" class="text-gray-96 font-circular text-xs mt-3 hover:text-gray-500"><a :href="accomplishment.url" target="_blank">View full story at {{getUrlHost(accomplishment.url)}}</a></p>
          </div>
        </div>
      </div>
    </div>

    <!-- Tag View -->
    <div v-if="isByTags" class="pr-4">
      <div class="mb-2">
        <button class="py-1 flex justify-between items-center font-circular text-xs text-gray-96" @click.once="goToYearView">
          <img class="h-4" src="@/assets/img/chevron-left.svg" alt="chevron-left">
          <span class="ml-1">Back to yearly view</span>
        </button>
      </div>

      <div class="mb-6">
        <div class="flex justify-between items-center mb-1">
          <p class="font-circular text-xl font-semibold capitalize">{{tag}}</p>
          <span class="text-xs font-circular">{{labelData.length}} accomplishment{{labelData.length > 1 ? 's' : ''}}</span>
        </div>
        <div v-for="(accomplishment, index) of labelData" :key="index" class="quarter-view-accomplishment border-t border-gray-db relative block">
          <input type="checkbox" :name="`${accomplishment.quarter}_${index}`" :id="`${accomplishment.quarter}_${index}`" class="invisible absolute">
          <label :for="`${accomplishment.quarter}_${index}`">
            <header class="py-3 cursor-pointer">
              <div class="relative flex justify-between items-center">
                <span class="font-semibold capitalize font-circular">{{accomplishment.data.title}}</span>
                <span class="flex">
                  <span class="text-xs text-gray-96 font-circular mr-2">Published {{accomplishment.data.createdOn | our-date}}</span>
                  <img src="@/assets/img/chevron-down.svg" alt="chevron-down">
                </span>
              </div>
              <div class="tags mt-2">
                <div v-for="tag in accomplishment.data.tags" :key="`${accomplishment.quarter}_${tag}`" class="inline-block tag text-xs font-circular py-1 px-3 border border-gray-db mr-2 capitalize">
                  {{tag}}
                </div>
              </div>
            </header>
          </label>
          <div class="mb-4 pr-12 quarter-view-accomplishment-detail">
            <!-- image here -->
            <div class="w-full h-48 mb-4 bg-gray-db bg-cover bg-center" v-if="accomplishment.data.image && accomplishment.data.image.url" :style="{ 'background-image': 'url('+ accomplishment.data.image.url +')'  }"></div>
            <p class="">{{accomplishment.data.description}}</p>
            <p v-if="accomplishment.data.url" class="text-gray-96 font-circular text-xs mt-3 hover:text-gray-500"><a :href="accomplishment.data.url" target="_blank">View full story at {{getUrlHost(accomplishment.data.url)}}</a></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DataUtil from '@/helpers/dataUtil';
import ValidatorUtil from '@/helpers/validatorUtil';
import StringUtil from '@/helpers/stringUtil';

export default {
  name: 'quarterly-view',
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
  computed: {
    isDefined() {
      return ValidatorUtil.isDefined(this.data);
    },
    isByTags() {
      return this.view === 'tags';
    },
    isQuarterly() {
      return this.view === 'quarterly';
    },
    isYearly() {
      return this.view === 'yearly';
    },
    yearInfo() {
      let tags = [];
      let total = 0;
      this.keys.forEach((x) => {
        const tempKeys = Object.keys(this.data[x.label]);
        tempKeys.forEach((y) => {
          total += this.data[x.label][y].length;
          this.data[x.label][y].forEach((z) => {
            z.tags.forEach((tag) => {
              if (!tags.includes(tag)) {
                tags.push(tag);
              }
            });
          });
        });
      });

      tags = DataUtil.sortArray(tags, true);

      return { tags, total };
    },
  },
  data() {
    return {
      labelData: null,
      quarters: [{ key: 'q1', displayName: 'Q1', period: 'January - March' }, { key: 'q2', displayName: 'Q2', period: 'April - June' }, { key: 'q3', displayName: 'Q3', period: 'July - September' }, { key: 'q4', displayName: 'Q4', period: 'October - December' }],
      selectedQuarters: null,
      tag: null,
      tags: [],
      view: 'yearly',
    };
  },
  methods: {
    getDate(date) {
      return (new Date(date)).toDateString();
    },
    goToYearView() {
      this.$emit('setSideTabs');
      this.view = 'yearly';
    },
    selectQuarter(quarter, year, data) {
      const info = quarter;
      const sideTabs = [];
      info.year = year;
      info.data = data;
      info.keys = Object.keys(data);
      this.selectedQuarters = info;
      this.view = 'quarterly';
      info.keys.forEach((x) => {
        sideTabs.push({
          label: `${x} ${year}`,
          value: `${x}_${year}`,
        });
      });
      this.$emit('setSideTabs', sideTabs);
    },
    sortByTags(tag) {
      this.tag = tag;
      const data = [];
      const sideTabs = [];
      this.keys.forEach((x) => {
        const tempKeys = Object.keys(this.data[x.label]);
        tempKeys.forEach((y) => {
          this.data[x.label][y].forEach((z) => {
            if (z.tags.includes(tag)) {
              if (sideTabs.findIndex(a => a.label === `${y} ${x.label}`) === -1) {
                sideTabs.push({
                  label: `${y} ${x.label}`,
                  value: `${y}_${x.label}`,
                });
              }
              data.push({
                year: x.label,
                quarter: y,
                data: z,
              });
            }
          });
        });
      });
      this.sideTabs = sideTabs;
      this.labelData = data;
      this.view = 'tags';
      this.$emit('setSideTabs', sideTabs);
    },
    isValid(element) {
      return ValidatorUtil.isDefined(element);
    },
    getUrlHost(url) {
      return StringUtil.getUrlHost(url);
    },
  },
};
</script>

<style lang="scss">
  .quarter-view-accomplishment-detail {
    display: none;
  }
  .quarter-view-accomplishment header img {
    transition: 0.4s transform;
  }
  .quarter-view-accomplishment input[type="checkbox"]:checked ~ label header img {
    transform: rotate(180deg);
  }
  .quarter-view-accomplishment input[type="checkbox"]:checked ~ .quarter-view-accomplishment-detail {
    display: block;
  }
</style>
