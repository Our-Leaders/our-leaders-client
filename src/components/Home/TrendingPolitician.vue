<template>
<div class="trending-slide block relative">
  <p class="text-2xl -mt-3 mb-4">Trending today</p>
  <div class="relative w-full h-20 md:h-32 lg:h-40">
    <a @click="toggle(-1)" class="toggle-arrow toggle-arrow-left">
      <img src="@/assets/img/chevron-left.svg"/>
    </a>
    <div class="relative">
      <div class="trending-image-overlay"><img :src="politician.profileImage" class="trending-image"/></div>
      <div class="trending-image-overlay"><img :src="politician.profileImage" class="trending-image"/></div>
      <div class="trending-image-overlay"><img :src="politician.profileImage" class="trending-image"/></div>
    </div>
    <a @click="toggle(1)" class="toggle-arrow toggle-arrow-right">
      <img src="@/assets/img/chevron-right.svg"/>
    </a>
    <div class="trending-likes">
      <img class="like-thumb ml-2 -mt-1" src="@/assets/img/thumbs-up-primary.svg"/>
      <span class="inline-block text-white align-middle">{{politician.vote.up}}</span>
      <img class="like-thumb ml-5 mt-1" src="@/assets/img/thumbs-down-white.svg"/>
      <span class="inline-block text-white align-middle mr-2">{{politician.vote.down}}</span>
    </div>
  </div>
  <div class="font-circular text-sm lg:text-base mt-5">
    <h4 class="font-semibold">{{politician.name}}</h4>
    <p class="capitalize overflow-ellipse">{{position}}</p>
  </div>
</div>
</template>

<script>
export default {
  name: 'trending-politician',
  props: {
    politician: {
      type: Object,
    },
  },
  methods: {
    toggle(index) {
      console.log('toggled: ', index);
    },
  },
  computed: {
    position() {
      const background = this.politician.politicalBackground.find(x => x.inOffice);
      return `${background.position} of ${background.institution}`;
    },
  },
};
</script>

<style lang="scss" scoped>
  .trending-slide {
    width: 15rem;
    margin: 0 2rem;

    .trending-image-overlay {
      position: absolute;
      height: 10rem;
      z-index: 2;

      &:after {
        position: absolute;
        content: "";
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }

      &:nth-child(2) {
        z-index: 1;
        right: -0.6rem;
        height: 8.75rem;
        top: 0.625rem;

        &:after {
          background: rgba($color: white, $alpha: 0.2);
        }
      }

      &:nth-child(3) {
        z-index: 0;
        right: -1.15rem;
        height: 7.5rem;
        top: 1.25rem;

        &:after {
          background: rgba($color: white, $alpha: 0.4);
        }
      }

      .trending-image {
        @apply w-full h-full object-cover;
      }
    }

    .toggle-arrow {
      @apply absolute cursor-pointer;

      img {
        width: 1rem;
      }

      &.toggle-arrow-left {
        left: -3.5rem;
        bottom: calc(50% - 0.5rem);
      }

      &.toggle-arrow-right {
        right: -3.5rem;
        bottom: calc(50% - 0.5rem);
      }
    }

    .trending-likes {
      @apply font-circular text-xxs absolute bottom-0 flex py-1;
      background: rgba(0, 0, 0, 0.6);
      z-index: 2;

      .like-thumb {
        @apply inline-block mr-1;
        width: 0.8125rem;
      }
    }
  }
</style>
