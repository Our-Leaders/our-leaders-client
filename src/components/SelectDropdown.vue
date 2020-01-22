<template>
  <div class="w-full relative input-fields no-bottom mb-2" :class="{
    'inactive': selectedLabel === null
    }">
    <label class="block font-semibold" v-if="!noLabel">{{label}}</label>
    <our-dropdown class="visible py-2 lg:py-0 xl:py-0" width="w-full" parent-width="w-full" :show-icon="true" :heading="selectedValue" ref="ourDropdown">
      <our-dropdown-item v-for="(option, i) in options" :key="i">
        <span v-if="isObjects" @click="onSelect(option.value, option.label)">
          {{option.label}}
        </span>
        <span v-if="isStrings" @click="onSelect(option)">
          {{option}}
        </span>
      </our-dropdown-item>
    </our-dropdown>
  </div>
</template>

<script>
export default {
  name: 'select-dropdown',
  props: {
    initialValue: {
      type: Object,
    },
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
  mounted() {
    if (this.initialValue) {
      this.selectedLabel = this.initialValue.label;
    }
  },
  data() {
    return {
      openNav: true,
      selectedLabel: null,
    };
  },
  computed: {
    isObjects() {
      return this.options[0] && typeof this.options[0] === 'object';
    },
    isStrings() {
      return this.options[0] && typeof this.options[0] === 'string';
    },
    noLabel() {
      return !this.label || this.label.length === 0;
    },
    profileShowClass() {
      if (this.openNav) return 'visible';
      return 'invisible';
    },
    selectedValue() {
      return this.selectedLabel === null ? `Select ${this.label}` : this.selectedLabel;
    },
  },
  methods: {
    onSelect(value, label) {
      this.selectedLabel = this.isObjects ? label : value;
      this.$emit('change', this.field, value);
      this.$refs.ourDropdown.closeDropdown();
    },
  },
};
</script>

<style lang="scss">
</style>
