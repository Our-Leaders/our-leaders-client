<template>
<div class="block relative">
  <div class="hidden trending-slide lg:block">
    <p class="text-2xl -mt-3 mb-4">Trending today</p>
    <div class="relative w-full h-20 md:h-40">
      <a @click="toggle(-1)" class="toggle-arrow toggle-arrow-left">
        <img src="@/assets/img/chevron-left.svg"/>
      </a>
      <div class="relative">
        <div class="trending-image-overlay" :key="1"><img :src="selectedPolitician.profileImage" class="trending-image"/></div>
        <div class="trending-image-overlay" :key="2"><img :src="politicians[getNextPoliticianIndex(1)].profileImage" class="trending-image"/></div>
        <div class="trending-image-overlay" :key="3"><img :src="politicians[getNextPoliticianIndex(2)].profileImage" class="trending-image"/></div>
      </div>
      <a @click="toggle(1)" class="toggle-arrow toggle-arrow-right">
        <img src="@/assets/img/chevron-right.svg"/>
      </a>
      <div class="trending-likes">
        <img class="like-thumb ml-2 -mt-1" src="@/assets/img/thumbs-up-primary.svg"/>
        <span class="inline-block text-white align-middle">{{selectedPolitician.vote.up}}</span>
        <img class="like-thumb ml-5 mt-1" src="@/assets/img/thumbs-down-white.svg"/>
        <span class="inline-block text-white align-middle mr-2">{{selectedPolitician.vote.down}}</span>
      </div>
    </div>
    <div class="font-circular text-sm lg:text-base mt-5">
      <h4 class="font-semibold">{{selectedPolitician.name}}</h4>
      <p class="capitalize overflow-ellipse">{{position(selectedPolitician)}}</p>
    </div>
  </div>
  <div class="lg:hidden -mr-6 md:mr-0">
    <our-home-politicians :politicians="politicians" ></our-home-politicians>
  </div>
</div>
</template>

<script>
export default {
  name: 'trending-politician',
  data() {
    return {
      selectedPoliticianIndex: 0,
    };
  },
  props: {
    politicians: {
      type: Array,
    },
  },
  methods: {
    toggle(operator) {
      if (operator > 0) {
        this.selectedPoliticianIndex = this.getNextPoliticianIndex(1);
      } else {
        this.selectedPoliticianIndex = this.getPreviousPoliticianIndex();
      }
    },
    getNextPoliticianIndex(skipCount) {
      const index = this.selectedPoliticianIndex;
      if (index + skipCount < this.politicians.length) {
        return index + skipCount;
      }
      return skipCount - 1;
    },
    getPreviousPoliticianIndex() {
      const index = this.selectedPoliticianIndex;
      if (index === 0) {
        return this.politicians.length - 1;
      }
      return index - 1;
    },
    position(politician) {
      const background = politician.politicalBackground.find(x => x.inOffice);
      return `${background.position} of ${background.institution}`;
    },
  },
  computed: {
    selectedPolitician() {
      return this.politicians[this.selectedPoliticianIndex];
    },
  },
};
</script>

<style lang="scss" scoped>
  .trending-slide {
    width: 15rem;

    @screen md {
      margin: 0 1.5rem;
    }

    @screen lg {
      margin: 0 2rem;
    }

    .trending-image-overlay {
      position: absolute;
      height: 10rem;
      width: 100%;
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
        left: -2.5rem;
        bottom: calc(50% - 0.5rem);

        @screen lg {
          left: -3.5rem;
        }
      }

      &.toggle-arrow-right {
        right: -2.5rem;
        bottom: calc(50% - 0.5rem);

        @screen lg {
          right: -3.5rem;
        }
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

  .trending-politician {
    &:not(:last-child) {
      padding-right: 1rem;

      @screen md {
        padding: 0 1rem;
      }
    }
  }
</style>
