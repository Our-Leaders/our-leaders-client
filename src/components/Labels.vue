<template>
  <div class="flex flex-wrap">
    <span class="inline-block label border-2 border-nav mr-2 mb-2 px-2 py-1"
      v-for="(option, i) of options"
      :class="{'active': isLabel(option.value)}"
      @click="setLabel(option.value);$emit('changed', option.value)"
      :key="i">
      {{option.label}}
    </span>
  </div>
</template>

<script>
export default {
  name: 'labels',
  props: {
    options: {
      type: Array,
    },
  },
  data() {
    return {
      label: null,
    };
  },
  methods: {
    isLabel(label) {
      return this.label === label;
    },
    setLabel(label) {
      this.label = label;
    },
  },
};
</script>

<style lang="scss">
  .label {
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &:hover,
    &.active {
      border: 2px solid #CE9833;
      color: #CE9833;
    }
  }
</style>
