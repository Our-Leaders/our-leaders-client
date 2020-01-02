<template>
  <button @focusout="closeCountryList" class="selector-container relative text-left focus:outline-none w-full">
    <div @click="toggleCountryList" class="flex mt-4 xl:mt-0 xl:ml-2 border xl:border-0 p-4 font-circular flex justify-between xl:justify-end">
      <img class="mr-5" :src="countryFlag(selectedCountry.flag)"/>
      <img src="@/assets/img/chevron-down.svg"/>
    </div>
    <transition name="fade" mode="out-in">
      <div class="fixed xl:absolute w-full xl:w-64 country-list p-6 xl:px-4 xl:py-3 right-0 bg-white" v-if="countryListOpen">
        <div class="xl:hidden flex justify-between items-center font-circular mb-4">
          <p>Choose country</p>
          <img class="close-button" @click="toggleCountryList" src="@/assets/img/close.svg"/>
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
    </transition>
  </button>
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
      this.closeCountryList();
    },
    countryFlag(flag) {
      const images = require.context('@/assets/img/flags', false, /\.svg$/);
      return images(`./${flag}`);
    },
    toggleCountryList() {
      this.countryListOpen = !this.countryListOpen;
    },
    closeCountryList() {
      this.countryListOpen = false;
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

    .close-button {
      margin-right: -6px;
      margin-top: -2px;
    }

    ul li:not(:last-child) {
      @apply mb-3;
    }

    @screen xl {
      @apply shadow-primary h-auto;
      top: 3.1rem;
      max-height: 20rem;
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
