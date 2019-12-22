<template>
  <div class="w-full">
    <div class="scroll-wrapper hidden lg:block xl:block">
      <div class="scrollbar">
        <span class="text-xs"
          v-for="(option, i) of options" :key="i"
          @click="$emit('scroll', option.value);setPage(i)">{{option.label}}</span>
      </div>
      <div class="thumb" :style="customStyle"></div>
    </div>
    <!-- Mobile Side Nav Is Unsure for now -->
    <!-- <div class="scroll-wrapper-2 visible lg:hidden xl:hidden">
      <div class="scrollbar">
        <span class="text-xs" v-for="(option, i) of options" :key="i" @click="setPage(i)">{{option.label}}</span>
      </div>
      <div class="thumb" :style="customStyle2"></div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'side-scroll',
  props: {
    options: {
      type: Array,
      required: true,
    },
  },
  computed: {
    customStyle() {
      return { top: `${this.page * 42 + 24}px` };
    },
    // Mobile Side Nav Is Unsure for now
    // customStyle2() {
    //   return { left: `${this.page * 42 + 24}px` };
    // },
  },
  data() {
    return {
      page: 0,
    };
  },
  methods: {
    next() {
      this.page += 1;
    },
    setPage(index) {
      this.page = index;
    },
  },
};
</script>

<style lang="scss">
  .scroll-wrapper {
    min-height: 220px;
    position: relative;

    .scrollbar {
      border-left: 1px solid #C4C4C4;
      height: 100%;
      left: 4px;
      padding-bottom: 24px;
      padding-left: 10px;
      padding-top: 24px;
      position: absolute;

      span {
        display: block;
        line-height: 42px;
      }
    }

    .thumb {
      background: #C79947;
      height: 42px;
      position: absolute;
      width: 8px;
      transition-delay: 100ms;
      transition-duration: 200ms;
      transition-timing-function: ease-in-out;
    }
  }

  // Mobile Side Nav Is Unsure for now
  // .scroll-wrapper-2 {
  //   margin-top: 50px;
  //   position: relative;
  //   width: 100%;

  //   .scrollbar {
  //     border-bottom: 1px solid #C4C4C4;
  //     bottom: 4px;
  //     padding-left: 24px;
  //     padding-right: 24px;
  //     position: absolute;
  //     width: 100%;

  //     span {
  //       display: inline-block;
  //       text-overflow: ellipsis;
  //       overflow: hidden;
  //       white-space: nowrap;
  //       width: 60px;
  //     }
  //   }

  //   .thumb {
  //     background: #C79947;
  //     height: 8px;
  //     position: absolute;
  //     transition-delay: 100ms;
  //     transition-duration: 200ms;
  //     transition-timing-function: ease-in-out;
  //     width: 42px;
  //   }
  // }
</style>
