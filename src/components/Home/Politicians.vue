<template>
<div class="politicians-container font-circular md:-mb-12">
  <a v-if="canScrollLeft" @click="swipeLeft" class="swipe-arrow swipe-arrow-left hidden md:inline-block">
    <img src="@/assets/img/chevron-left.svg"/>
  </a>
  <div class="flex flex-no-wrap mb-4 min-h-64 overflow-x-auto md:overflow-hidden" ref="slider">
    <div class="politician flex-none w-7/8 md:w-2/6 md:mb-12" v-for="(politician, i) in politicians" :key="i">
      <router-link :to="{name: 'politician', params: { politicianId: politician.id }}" class="block relative lg:hover:shadow-shallow cursor-pointer bg-gray-fa">
        <div class="w-full overflow-hidden md:h-40 lg:h-48" :class="isCard ? 'h-56' : 'h-48'">
          <img :src="politician.profileImage" class="w-full object-cover"/>
        </div>
        <div :class="isCard ? 'p-4' : 'py-4'">
          <div class="w-full mb-4">
            <img class="inline-block mr-1 md:mr-2 h-3 md:h-4" src="@/assets/img/thumbs-up.svg"/>
            <span class="inline-block mr-2 md:mr-4 h-3 md:h-4 align-middle text-xs md:text-sm">{{politician.vote.up}}</span>
            <img class="inline-block mr-1 md:mr-2 mt-2 h-3 md:h-4" src="@/assets/img/thumbs-down.svg"/>
            <span class="inline-block mr-1 md:mr-2 h-3 md:h-4 align-middle text-xs md:text-sm">{{politician.vote.down}}</span>
          </div>
          <h4 class="font-semibold text-base">{{politician.name}}</h4>
          <h4 class="capitalize overflow-ellipse text-base">{{position(politician)}}</h4>
        </div>
      </router-link >
    </div>
  </div>
  <a v-if="canScrollRight" @click="swipeRight" class="swipe-arrow swipe-arrow-right hidden md:inline-block">
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
    isCard: {
      type: Boolean,
    },
  },
  data() {
    return {
      canScrollLeft: false,
      canScrollRight: this.politicians.length > 3,
    };
  },
  methods: {
    position(politician) {
      if (politician.politicalBackground.length === 0) {
        return 'Not in Office';
      }

      const background = politician.politicalBackground.find(x => x.inOffice);
      return `${background.position}, ${background.institution}`;
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
          this.canScrollRight = this.politicians.length > 3 && element.clientWidth + element.scrollLeft < element.scrollWidth;
        };

        window.requestAnimationFrame(scroll);
      }
    },
    swipeLeft() {
      const { slider } = this.$refs;
      const position = slider.offsetWidth;
      this.scrollTo(slider, -position, 300);
    },
    swipeRight() {
      const { slider } = this.$refs;
      const position = slider.offsetWidth;
      this.scrollTo(slider, position, 300);
    },
  },
};
</script>

<style lang="scss">
  .politicians-container {
    min-height: 21.35rem;

    @screen md {
      margin-left: -1rem;
      width: calc(100% + 2rem);
      position: relative;
      min-height: 20rem;
    }

    @screen lg {
      min-height: 24rem;
    }

    .politician {
      padding-right: 1rem;

      @screen md {
        padding: 0 1rem;
      }
    }
  }

  .swipe-arrow {
    @apply absolute cursor-pointer;
    background: rgba(0, 0, 0, 0.3);
    top: 3.5rem;
    padding: 0.6rem;
    z-index: 1;

    img {
      width: 1rem;
    }

    @screen md {
      top: 6.5rem;
    }

    @screen lg {
      background: none;
      top: 5.5rem;
      padding: 0;
    }

    &.swipe-arrow-left {
      left: 1rem;
      z-index: 1;

      @screen lg {
        left: -0.875rem;
      }

      @screen xl {
        left: -2.875rem;
      }
    }

    &.swipe-arrow-right {
      right: 1rem;

      @screen lg {
        right: -0.875rem;
      }

      @screen xl {
        right: -2.875rem;
      }
    }
  }
</style>
