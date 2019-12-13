<template>
  <li class="m-1">
    <span v-if="!isLink" href="#" class="block text-sm py-1 leading-snug"><slot /></span>
    <a v-if="isLink" href="#" class="block hover:bg-gray-100 text-sm py-1"><slot /></a>
  </li>
</template>

<script>
export default {
  props: {
    isLink: {
      type: Boolean,
    },
  },
};
</script>

<style lang="scss" scoped>
  li {
    &:last-child {
      margin-bottom: 0;
    }

    &:first-child {
      margin-top: 0;
    }
  }
</style>
