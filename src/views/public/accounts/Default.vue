<template>
  <div class="flex h-screen relative">
    <div class="w-1/3 inbox py-24 border-r-2 border-gray-200">
      <div class="float-right mr-16">
        <h4 class="text-2xl mb-6">Account Preference</h4>
        <ul class="side-nav">
          <li :class="{ active: isPage('basic') }" @click="setPage('basic')">
            <span>Basic Information</span>
          </li>
          <li :class="{ active: isPage('subscriptions') }" @click="setPage('subscriptions')">
            <span>Manage Subscriptions</span>
          </li>
          <li :class="{ active: isPage('votes') }" @click="setPage('votes')">
            <span>Votes</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="w-2/3 p-section">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'accounts',
  data() {
    return {
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
  .p-section {
    padding-left: 40px;
    padding-top: 82px;
  }

  .side-nav {
    li {
      cursor: pointer;
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
