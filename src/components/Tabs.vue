<template>
<div>
  <div v-if="tabType === 'primary'" id="tabs" class="flex flex-wrap absolute bottom-0 w-full h-10 bg-white border-t-2 border-white text-center">
    <div v-for="(tab, i) in tabs" :key="i" :class="{
      'w-1/3 cursor-pointer': true,
      'active-tab': isActive(tab.value)}"
      @click="setTab(tab.value);$emit('change', tab.value);">
      <span class="triangle" v-if="isActive(tab.value)"></span>
      <span class="align-middle text-sm md:text-base">{{tab.label}}</span>
    </div>
  </div>
  <div v-if="tabType === 'secondary'" class="secondary-tabs flex w-full border-b border-primary">
    <div class="secondary-tab py-4 text-center relative cursor-pointer"
      v-for="(tab, i) in tabs"
      :key="i"
      @click="setTab(tab.value);$emit('change', tab.value);">
      <span :class="{'font-semibold': isActive(tab.value)}">{{tab.label}}</span>
        <span v-if="isActive(tab.value)" class="bottom-triangle"></span>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'tabs',
  props: {
    tabs: {
      type: Array,
      required: true,
    },
    tabType: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      currentTab: this.tabs[0].value,
    };
  },
  methods: {
    isActive(tab) {
      return this.currentTab === tab;
    },
    setTab(tab) {
      this.currentTab = tab;
    },
  },
};
</script>

<style lang="scss" scoped>
  #tabs {
    div {
      @apply flex flex-col justify-center;
    }
  }

  .secondary-tabs {
    min-width: fit-content;

    .secondary-tab {
      margin-right: 2rem;
      min-width: 2rem;

      &:last-child {
        margin-right: 1.5rem;
      }
    }
  }

  .active-tab {
    color: white;
    position: relative;
    @apply bg-primary;
  }

  .bottom-triangle {
    height: 0;
    width: 0;
    display: block;
    margin: auto;
    border-bottom: 10px solid #C79947;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    border-top: 10px solid transparent;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .bottom-triangle::after {
    height: 0;
    width: 0;
    display: block;
    content: "";
    border-bottom: 10px solid white;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    border-top: 10px solid transparent;
    position: absolute;
    left: -12px;
    top: -8px;
  }

  .triangle {
    height: 0;
    width: 0;
    display: block;
    margin: auto;
    border-bottom: 18px solid white;
    border-left: 18px solid transparent;
    border-right: 18px solid transparent;
    border-top: 18px solid transparent;
    position: absolute;
    bottom: 100%;
    left: 0;
    right: 0;
  }

  .triangle::after {
    height: 0;
    width: 0;
    display: block;
    content: "";
    border-bottom: 15px solid #C79947;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-top: 15px solid transparent;
    position: absolute;
    left: -15px;
    top: -11px;
  }
</style>
