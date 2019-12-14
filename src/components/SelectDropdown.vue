<template>
  <div class="w-full input-fields pb-2" :class="{
    'inactive': value === null
    }">
    <label class="block font-semibold mb-2" for="politicalParty">{{label}}</label>
    <div class="select">
      <select
        v-if="isObjects"
        class="w-full inline-block"
        name="politicalParty"
        id="politicalParty"
        v-model="value"
        @change="$emit('change', field, value)">
        <option :value="null">Select {{label}}</option>
        <option v-for="(option, i) in options" :key="i" :value="option.value">{{option.label}}</option>
      </select>
      <select
        v-if="isStrings"
        class="w-full inline-block"
        name="politicalParty"
        id="politicalParty"
        v-model="value"
        @change="$emit('change', field, value)">
        <option :value="null">Select {{label}}</option>
        <option v-for="(option, i) in options" :key="i" :value="option">{{option}}</option>
      </select>
      <img src="../assets/img/angle-arrow-down.svg"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'select-dropdown',
  props: {
    field: {
      required: true,
      type: String,
    },
    label: {
      type: String,
    },
    options: {
      required: true,
      type: Array,
    },
  },
  data() {
    return {
      value: null,
    };
  },
  computed: {
    isObjects() {
      return this.options[0] && typeof this.options[0] === 'object';
    },
    isStrings() {
      return this.options[0] && typeof this.options[0] === 'string';
    },
  },
};
</script>

<style lang="scss">
</style>
