<template>
  <div class="flex flex-wrap h-screen relative">
    <div class="w-full lg:w-1/3 xl:w-1/3 inbox lg:py-24 xl:py-24 border-r-2 border-gray-200">
      <div class="float-right mr-16 hidden lg:block xl:block">
        <h4 class="text-2xl mb-6">Account Preference</h4>
        <ul class="side-nav">
          <router-link class="side-nav-li" :to="{ name: 'account-home' }" active-class="active">
            <span>Basic Information</span>
          </router-link>
          <router-link class="side-nav-li" :to="{ name: 'account-subscriptions' }" active-class="active">
            <span>Manage Subscriptions</span>
          </router-link>
          <li :class="{ active: isPage('votes') }" @click="setPage('votes')">
            <span>Votes</span>
          </li>
        </ul>
      </div>
      <div class="lg:hidden xl:hidden">
        <h4 class="w-full text-xl text-center mt-2 font-bold">Account Preference</h4>
        <our-tabs class="mb-1" v-on:change="setPage" :tabs='mainTabs' :tab-type="'secondary'"></our-tabs>
      </div>
    </div>
    <div class="w-full lg:w-2/3 xl:w-2/3 pl-10 pt-5 lg:pt-20 xl:pt-20">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'accounts',
  data() {
    return {
      mainTabs: [{ label: 'Basic Information', value: 'basic' }, { label: 'Manage Subscriptions', value: 'subscriptions' }, { label: 'Votes', value: 'votes' }],
      page: 'basic',
    };
  },
  methods: {
    isPage(page) {
      return this.page === page;
    },
    setPage(page) {
      this.page = page;
    },
  },
};
</script>

<style lang="scss">

  .side-nav {
    .side-nav-li, li {
      cursor: pointer;
      display: block;
      margin-bottom: 30px;
      margin-top: 30px;

      span {
        transition-delay: 100ms;
        transition-duration: 300ms;
        transition-property: border-bottom font-weight;
        transition-timing-function: ease-in-out;
      }

      &.active {
        span {
          border-bottom: 2px solid #CE9833;
          font-weight: bold;
          padding-bottom: 7px;
          padding-right: 10px;
        }
      }
    }
  }
</style>
