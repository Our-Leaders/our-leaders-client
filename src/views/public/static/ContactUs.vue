<template>
  <div class="flex flex-wrap relative h-screen">
    <div class="w-full lg:w-1/3 xl:w-1/3 border-b-2 xl:border-b-0 mx-10 lg:mx-0 xl:mx-0 lg:border-r-2 xl:border-r-2 border-gray-200 px-20">
      <h4 class="text-6xl mt-8 text-center lg:text-left xl:text-left lg:mt-56 xl:mt-56 mb-12"><span class="text-primary">Contact</span> us</h4>
      <span class="text-base text-center lg:text-left xl:text-left font-bold mb-2 block">Visit us on</span>
      <div class="block mb-6 text-center lg:text-left xl:text-left">
        <img class="cursor-pointer inline-block h-4 mr-8" src="@/assets/img/facebook-gray.svg"/>
        <img class="cursor-pointer inline-block h-4 mr-8" src="@/assets/img/twitter-gray.svg"/>
        <img class="cursor-pointer inline-block h-4 mr-8" src="@/assets/img/linkedIn-gray.svg"/>
        <img class="cursor-pointer inline-block h-4" src="@/assets/img/instagram-gray.svg"/>
      </div>
    </div>
    <div class="w-full lg:w-2/3 xl:w-2/3 pl-10 pr-10 lg:pr-64 xl:pr-64 mb-6">
      <h3 class="text-4xl mt-8 mb-6">Contact details</h3>
      <div class="block border-b-2 border-gray-200">
        <span class="block font-semibold mb-1">Address</span>
        <span class="block mb-10 w-64">{{page.contact.address}}</span>
        <span class="block font-semibold mb-1">Phone</span>
        <span class="block mb-10 w-64">{{page.contact.phoneNumber}}</span>
        <span class="block font-semibold mb-1">Email</span>
        <span class="block mb-10 w-64">{{page.contact.email}}</span>
      </div>
      <h3 class="text-4xl mt-8 mb-6">Have a message?</h3>
      <textarea class="w-full bg-gray-100 border-b border-gray-300 resize-none outline-none p-3" rows="6"></textarea>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'contact-us',
  created() {
    this.getPages();
  },
  data() {
    return {
      loading: true,
      page: {
        contact: {},
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
</style>
