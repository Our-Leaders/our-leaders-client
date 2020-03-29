<template>
  <transition name="fade" mode="out-in">
    <div class="fixed top-0 left-0 bg-modal h-screen w-screen" v-if="show">
      <div class="container mx-auto">
        <button
          @click="$emit('dismiss')">
          <img class="absolute right-0 top-0 m-3" src="@/assets/img/close.svg"/>
        </button>
        <div class="block">
          <slot name="header"></slot>
        </div>
        <div class="block">
          <slot name="body"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'our-modal',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
  .bg-modal {
    background: rgba($color: #FFFFFF, $alpha: 0.7);
    backdrop-filter: blur(10px);
    z-index: 200;

    .container {
      background: #FFFFFF;
      box-shadow: 0px 12px 52px rgba($color: #000000, $alpha: 0.1);
      left: 0;
      margin: auto;
      max-width: 480px;
      padding-bottom: 40px;
      padding-left: 40px;
      padding-right: 40px;
      padding-top: 20px;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
</style>
