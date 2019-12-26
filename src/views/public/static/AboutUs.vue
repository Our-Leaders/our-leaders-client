<template>
  <div>
    <!-- Header -->
    <div class="flex mb-4">
      <div class="w-4/5 relative mx-auto h-auto bg-primary bg-overlay-header">
        <div id="main-header" class="flex flex-wrap px-6 py-24 text-white text-center">
          <div class="w-full md:w-1/2 lg:w-1/2 xl:w-1/2">
            <span class="text-6xl">About Us</span>
          </div>
        </div>
      </div>
    </div>

    <div class="flex mt-16 mb-32 mx-38">
      <div class="w-1/2 leading-relaxed text-base" v-html="page.aboutUs"></div>
      <div class="w-1/2 relative">
        <div class="about-us-1">
          <img src="@/assets/img/about-us-1.png"/>
        </div>
        <div class="about-us-2">
          <img src="@/assets/img/about-us-2.svg"/>
        </div>
      </div>
    </div>

    <div class="flex relative mb-64">
      <div class="block w-5/8 mx-auto">
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
      <div class="absolute text-center h-full w-full flex flex-col justify-center mt-19">
        <p class="text-4xl">OurLeaders.Africa was built by The<br/>People &amp; The Leaders, for The People<br/>&amp; The Leaders.</p>
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
  }

  .about-us-2 {
    bottom: 0;
    left: 27%;
    position: absolute;
    z-index: 2;
  }
</style>
