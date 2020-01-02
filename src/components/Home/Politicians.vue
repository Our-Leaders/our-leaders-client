<template>
<div class="politicians-container font-circular">
  <a v-if="canScrollLeft" @click="swipeLeft" class="swipe-arrow swipe-arrow-left invisible md:visible">
    <img src="@/assets/img/chevron-left.svg"/>
  </a>
  <div class="flex flex-no-wrap mb-4 min-h-64 overflow-x-auto lg:overflow-hidden" ref="slider">
    <div class="politician-container flex-none w-1/2 md:w-2/6 my-6 px-4" v-for="(politician, i) in politicians" :key="i">
      <div class="block relative hover:shadow-primary cursor-pointer bg-gray-fa">
        <div class="w-full overflow-hidden h-32 lg:h-48">
          <img :src="politician.profileImage" class="w-full object-cover"/>
        </div>
        <div class="p-4">
          <div class="w-full mb-4">
            <img class="inline-block mr-1 md:mr-2 h-3 md:h-4" src="@/assets/img/thumbs-up.svg"/>
            <span class="inline-block mr-2 md:mr-4 h-3 md:h-4 align-middle text-xs md:text-sm">{{politician.vote.up}}</span>
            <img class="inline-block mr-1 md:mr-2 mt-2 h-3 md:h-4" src="@/assets/img/thumbs-down.svg"/>
            <span class="inline-block mr-1 md:mr-2 h-3 md:h-4 align-middle text-xs md:text-sm">{{politician.vote.down}}</span>
          </div>
          <h4 class="font-semibold text-base">{{politician.name}}</h4>
          <h4 class="capitalize overflow-ellipse text-base">{{position(politician)}}</h4>
        </div>
      </div>
    </div>
  </div>
  <a v-if="canScrollRight" @click="swipeRight" class="swipe-arrow swipe-arrow-right invisible md:visible">
    <img src="@/assets/img/chevron-right.svg"/>
  </a>
</div>
</template>

<script>
export default {
  name: 'politician',
  props: {
    politicians: {
      type: Array,
    },
  },
  data() {
    return {
      canScrollLeft: false,
      canScrollRight: true,
    };
  },
  methods: {
    position(politician) {
      const background = politician.politicalBackground.find(x => x.inOffice);
      return `${background.position} of ${background.institution}`;
    },
    scrollTo(element, scrollPixels, duration) {
      const scrollPos = element.scrollLeft;

      if (!((scrollPos === 0 || scrollPixels > 0) && (element.clientWidth + scrollPos === element.scrollWidth + 1 || scrollPixels < 0))) {
        const startTime = performance.now ? performance.now() : new Date().getTime();
        const scroll = (timestamp) => {
          const timeElapsed = timestamp - startTime;
          const progress = Math.min(timeElapsed / duration, 1);
          element.scrollLeft = scrollPos + scrollPixels * progress; // eslint-disable-line no-param-reassign
          if (timeElapsed < duration) {
            window.requestAnimationFrame(scroll);
          }
          this.canScrollLeft = element.scrollLeft > 0;
          this.canScrollRight = element.clientWidth + element.scrollLeft < element.scrollWidth;
        };

        window.requestAnimationFrame(scroll);
      }
    },
    swipeLeft() {
      const { slider } = this.$refs;
      const position = slider.offsetWidth;
      this.scrollTo(slider, -position, 800);
    },
    swipeRight() {
      const { slider } = this.$refs;
      const position = slider.offsetWidth;
      this.scrollTo(slider, position, 800);
    },
  },
};
</script>

<style lang="scss">
  .politicians-container {
    width: calc(100% + 2rem);
    margin-left: -1rem;
  }

  .swipe-arrow {
    @apply absolute cursor-pointer;
    background: rgba(0, 0, 0, 0.3);
    bottom: calc(50% - 2rem);
    padding: 0.6rem;
    z-index: 1;

    img {
      width: 1rem;
    }

    @screen lg {
      background: none;
      bottom: calc(50% - 0.5rem);
      padding: 0;
    }

    &.swipe-arrow-left {
      left: 0;
      z-index: 1;

      @screen lg {
        left: -3.875rem;
      }
    }

    &.swipe-arrow-right {
      right: 1rem;

      @screen lg {
        right: -2.875rem;
      }
    }
  }
</style>
