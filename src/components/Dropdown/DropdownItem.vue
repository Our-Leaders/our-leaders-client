<template>
  <li class="my-2 font-circular">
    <span v-if="!isLink" class="block text-sm py-1 leading-snug"><slot /></span>
    <a v-if="isLink && onClick" @click="onClick" class="block hover:text-gray-600 text-sm py-1"><slot /></a>
    <router-link v-if="isLink && to" :to="to" class="block hover:text-gray-600 text-sm py-1"><slot /></router-link>
  </li>
</template>

<script>
export default {
  props: {
    isLink: {
      type: Boolean,
    },
    to: {
      type: [Object, String],
    },
    onClick: {
      type: Function,
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
