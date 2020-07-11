<template>
  <div class="overflow-x-hidden">
    <!-- Header -->
    <div class="flex flex-wrap mb-4 relative">
      <div class="w-full md:w-4/5 relative mx-auto h-auto bg-primary bg-overlay-header">
        <div id="main-header" class="flex flex-wrap px-6 pt-5 pb-64 md:py-24 text-white md:text-center">
          <div class="w-full md:w-1/2 lg:w-1/2 xl:w-1/2">
            <span class="text-6xl">About Us</span>
          </div>
        </div>
      </div>
      <div class="w-full relative block md:hidden">
        <div class="about-us-1 sm">
          <img src="@/assets/img/about-us-1.png"/>
        </div>
        <div class="about-us-2 sm">
          <img src="@/assets/img/about-us-2.svg"/>
        </div>
      </div>
    </div>

    <div class="flex mt-20 md:mt-16 mb-20 md:mb-32">
      <div class="w-full md:w-4/5 relative mx-auto h-auto">
        <div class="flex">
          <div class="w-full md:w-1/2 px-6 md:px-0 leading-relaxed text-base text-justify md:text-left" v-html="page.aboutUs"></div>
          <div class="w-1/2 relative hidden md:block">
            <div class="about-us-1">
              <img src="@/assets/img/about-us-1.png"/>
            </div>
            <div class="about-us-2 md">
              <img src="@/assets/img/about-us-2.svg"/>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex relative mb-64">
      <div class="hidden md:block w-5/8 mx-auto">
        <div class="inline-block w-1/3">
          <div class="border-2 border-primary h-20 w-20 block mx-auto"></div>
        </div>
        <div class="inline-block text-center w-1/3">
          <div class="border-t-2 border-primary h-16 w-20 block mx-auto"></div>
        </div>
        <div class="inline-block relative text-center w-1/3 h-full">
          <div class="absolute top-0 w-full">
            <div class="bg-primary h-10 w-10 block mx-auto mb-3"></div>
            <div class="block w-28 h-28 mx-auto">
              <span class="inline-block h-1 w-1 mx-2 bg-primary" v-for="index in 20" :key="index"></span>
            </div>
          </div>
        </div>
      </div>
      <div class="block relative pt-20 md:hidden w-full">
        <div class="absolute top-0 left-0">
          <div id="object-1" class="border-2 border-primary h-20 w-20 block"></div>
        </div>
        <div class="absolute left-0 right-0 top-0 text-center">
          <div class="border-t-2 border-primary h-16 w-32 block mx-auto"></div>
        </div>
        <div class="relative bottom-0 right-0 text-center w-full h-full">
          <div id="object-2" class="absolute top-0 right-0 w-full">
            <div class="bg-primary h-10 w-10 block mx-auto mb-3"></div>
            <div class="block w-28 h-28 mx-auto">
              <span class="inline-block h-1 w-1 mx-2 bg-primary" v-for="index in 20" :key="index"></span>
            </div>
          </div>
        </div>
      </div>
      <div class="absolute text-center h-full w-full flex flex-col justify-center mt-19">
        <p class="text-2xl md:text-4xl">OurLeaders.Africa is built <br class="md:hidden"/> by The<br class="hidden md:block"/> People &amp; The Leaders, <br class="md:hidden"/> for The People<br class="hidden md:block"/>&amp; The <br class="md:hidden"/> Leaders.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'about-us',
  created() {
    this.getPages();
  },
  data() {
    return {
      loading: true,
      page: {
        aboutUs: null,
      },
      pagesServices: this.$serviceFactory.pages,
    };
  },
  methods: {
    ...mapActions([
      'displayError',
    ]),
    async getPages() {
      try {
        const response = await this.pagesServices.getPages();
        this.page = response.data.page;
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.displayError(error);
      }
    },
  },
};
</script>

<style lang="scss">
  .about-us-1 {
    bottom: 60%;
    height: 315px;
    left: 4%;
    overflow: hidden;
    position: absolute;
    width: 260px;
    z-index: 3;

    &.sm {
      bottom: 0;
      height: 240px;
      left: 20%;
      overflow-x: hidden;
      transform: translateY(18%);
      width: 198px;
    }
  }

  .about-us-2 {
    bottom: 0;
    position: absolute;
    z-index: 2;

    &.md {
      left: 27%;
    }

    &.sm {
      bottom: 0;
      height: 240px;
      overflow-x: hidden;
      right: 0;
      transform: translateY(18%);
      width: 198px;

      img {
        height: 100%;
        object-fit: cover;
        transform: translateX(40%);
      }
    }

  }

  #object-1 {
    transform: translateX(-50px);
  }

  #object-2 {
    transform: translateX(50%);
  }
</style>
