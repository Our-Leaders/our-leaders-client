<template>
  <div class="flex flex-wrap h-1/2 lg:h-screen xl:h-screen">
    <div class="w-full lg:w-1/3 xl:w-1/3 bg-overlay relative" :class="bgClass">
      <router-link :to="{ name: 'home' }"><img class="h-16 my-6 mx-auto lg:mx-12 xl:mx-12 relative lg:absolute xl:absolute" :src="require(`@/assets/img/${logo}.svg`)"/></router-link>
      <div class="flex flex-col justify-center lg:h-full xl:h-full px-12">
        <slot name="left-caption"></slot>
      </div>
    </div>

    <!-- Right Side -->
    <div class="w-full lg:w-2/3 xl:w-2/3 flex flex-col justify-center">
      <transition name="fade">
        <div class="mt-20 lg:mt-0 xl:mt-0 mx-auto w-10/12 lg:w-6/12 xl:w-6/12">
          <span class="block text-5xl mb-10">
            <slot name="header"></slot>
          </span>
          <slot name="body"></slot>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isPrimary: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    bgClass() {
      return {
        'bg-primary': this.isPrimary,
        'bg-gray-100': !this.isPrimary,
      };
    },
    logo() {
      if (this.isPrimary) {
        return 'logo-w';
      }
      return 'logo-b';
    },
  },
};
</script>
