<template>
  <label class="flex justify-start">
    <span v-if="!left">{{label}}</span>
    <span class="checkbox mt-1" :class="{'mr-2': left}">
      <img class="z-30" src="@/assets/img/checked.svg"/>
      <input class="absolute z-20" type="checkbox" v-model="value" @change="$emit('change', value)" :disabled="disabled"/>
    </span>
    <span v-if="left">{{label}}</span>
  </label>
</template>

<script>
export default {
  name: 'our-checkbox',
  props: {
    label: {
      type: String,
    },
    left: {
      type: Boolean,
      default: false,
    },
    model: {
      type: Boolean,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      value: this.model,
    };
  },
};
</script>

<style lang="scss">
  .checkbox {
      display: inline-flex;
      cursor: pointer;
      position: relative;
      height: 15px;
      width: 15px;
  }

  .checkbox > img {
    height: 11px;
    margin: auto;
    width: 11px;
  }

  .checkbox {
    z-index: 30;
  }

  .checkbox > input {
      height: 15px;
      width: 15px;
      -webkit-appearance: none;
      -moz-appearance: none;
      -o-appearance: none;
      appearance: none;
      border: 1px solid #969696;
      outline: none;
      transition-duration: 0.3s;
      background-color: white;
      cursor: pointer;
      z-index: 10;
    }

  .checkbox > input:checked {
      border: 1px solid #00C543;
      background-color: #00C543;
  }

  .checkbox > input:active {
      border: 2px solid #00C543;
  }
</style>
