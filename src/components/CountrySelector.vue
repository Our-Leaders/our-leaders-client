<template>
  <div class="selector-container relative">
    <div @click="toggleCountryList" class="flex lg:p-0 lg:ml-2 mt-4 lg:mt-0 border lg:border-0 py-3 px-4 font-circular flex justify-between lg:justify-end">
      <img class="mr-5" :src="countryFlag(selectedCountry.flag)"/>
      <img src="@/assets/img/chevron-down.svg"/>
    </div>
    <div class="fixed lg:absolute w-full lg:w-64 country-list p-6 lg:px-4 lg:py-3 right-0 bg-white" v-if="countryListOpen">
      <div class="lg:hidden flex justify-between items-center font-circular mb-4">
        <p>Choose country</p>
        <img @click="toggleCountryList" src="@/assets/img/close.svg"/>
      </div>
      <ul>
        <li v-for="(countryObject, key) in countryList" :key="key" class="flex relative py-1 items-center" :class="selectedCountryClass(key)" @click="countrySelect(key)">
          <input type="radio" name="country" :value="key" :v-model="value" class="absolute invisible">
          <div class="flag-container mr-3">
            <img :src="countryFlag(countryObject.flag)"/>
          </div>
          <span class="font-circular text-sm">{{countryObject.name}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import countryList from '@/assets/json/countryList.json';

export default {
  name: 'CountrySelector',
  props: {
    value: {
      type: String,
      default: 'ngr',
    },
  },
  data() {
    return {
      countryList,
      countryListOpen: false,
    };
  },
  methods: {
    countrySelect(country) {
      this.$emit('input', country);
      this.countryListOpen = false;
    },
    countryFlag(flag) {
      const images = require.context('@/assets/img/flags', false, /\.svg$/);
      return images(`./${flag}`);
    },
    toggleCountryList() {
      this.countryListOpen = !this.countryListOpen;
    },
    selectedCountryClass(country) {
      if (country === this.value) return 'country-selected';
      return '';
    },
  },
  computed: {
    selectedCountry() {
      return this.countryList[this.value];
    },
  },
};
</script>

<style lang="scss" scoped>
  .selector-container {
    cursor: pointer;
  }

  .country-list {
    top: 0;
    height: 100vh;
    z-index: 100;
    overflow-y: scroll;

    ul li:not(:last-child) {
      @apply mb-3;
    }

    @screen lg {
      top: 3rem;
      max-height: 20rem;
      height: auto;
      box-shadow: 0px 12px 52px rgba(0, 0, 0, 0.1);
    }
  }

  .country-selected {
    @apply bg-gray-100;
  }

  .flag-container {
    height: 16px;
    width: 24px;
  }
</style>
