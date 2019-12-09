<template>
<nav class="flex items-center justify-between flex-wrap border-nav xl:border-b xl:m-0 px-6 py-4 xl:p-0 shadow-md xl:shadow-none">
  <router-link :to="{ name: 'home' }" class="nav-icon"><img class="xl:absolute mr-2 w-12" src="@/assets/img/logo.svg"/></router-link>
  <div class="block lg:hidden">
    <button @click="toggleNav" :class="menuToggleClass" class="nav-menu flex items-center focus:outline-none">
      <span></span>
      <span></span>
      <span></span>
    </button>
  </div>
  <div :class="navToggleClass" class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
    <div class="text-base lg:flex-grow">
      <router-link :to="{ name: '' }" class="block mt-4 lg:inline-block lg:mt-0 mr-4">Leaders</router-link>
      <router-link :to="{ name: '' }" class="block mt-4 lg:inline-block lg:mt-0 mr-4">Political parties</router-link>
    </div>
    <div>
      <ul class="relative lg:inline-flex lg:items-center">
        <li>
          <router-link :to="{ name: '' }" class="block lg:px-4 lg:py-2 lg:border-b border-transparent hover:border-primary mt-4 lg:mt-0">About</router-link>
        </li>
        <li>
          <router-link :to="{ name: '' }" class="block lg:px-4 lg:py-2 lg:border-b border-transparent hover:border-primary mt-4 lg:mt-0">Contact</router-link>
        </li>
        <li class="donate-wrapper">
          <router-link :to="{ name: '' }" class="px-4 py-2 mt-4 lg:ml-4 lg:mt-0 btn-primary-outline block leading-tight">Donate</router-link>
        </li>
        <li class="xl:absolute lg:ml-4 h-16 lg:border-r lg:border-l-0 lg:border-t-0 lg:border-b-0 border right-0 w-full mt-4 lg:mt-0">
          <div class="search-wrapper h-full relative mr-2 xl:mr-8">
            <input v-model="searchQuery" type="text" ref="search" class="search-input h-full w-full xl:w-6 xl:opacity-0 pr-6 xl:pl-0 pl-4 py-2" placeholder="Search" />
            <img class="search-img" src="@/assets/img/search.svg"/>
            <img @click="clearSearch" class="search-clear" src="@/assets/img/close.svg"/>
          </div>
        </li>
      </ul>
      <ul class="lg:inline-flex lg:items-center">
        <li class="lg:ml-9 lg:mr-2">
          <router-link :to="{ name: 'sign-up' }" class="mt-4 px-4 py-2 lg:mt-0 btn-primary block leading-tight">Sign up</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'sign-in' }" class="mt-4 px-4 py-3 lg:mt-0 border border-primary lg:border-b lg:border-transparent hover:border-primary w-full block leading-tight font-circular">Log in</router-link>
        </li>
        <li>
          <our-country-selector v-model="country" />
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>

<script>
export default {
  name: 'our-navbar',
  data() {
    return {
      openNav: false,
      searchQuery: '',
      country: 'ngr',
    };
  },
  computed: {
    navToggleClass() {
      if (this.openNav) return 'block';
      return 'hidden';
    },
    menuToggleClass() {
      if (this.openNav) return 'open';
      return '';
    },
  },
  methods: {
    toggleNav() {
      this.openNav = !this.openNav;
    },
    clearSearch() {
      this.$refs.search.focus();
      this.searchQuery = '';
    },
  },
};
</script>

<style lang="scss" scoped>
  nav {
    @screen xl {
      margin-left: 13.65rem;
      margin-right: 4.25rem;
      min-height: 6.25rem;

      .nav-icon img {
        left: 3.95rem;
        top: 1.315rem;
        width: 6.875rem;
      }

      .donate-wrapper {
        margin-right: 5.25rem;
      }
    }


    .nav-menu {
      cursor: pointer;
      height: 16px;
      position: relative;
      transform: rotate(0deg);
      transition: .5s ease-in-out;
      width: 30px;

      span {
        background: black;
        border-radius: 4px;
        display: block;
        height: 1px;
        left: 0;
        opacity: 1;
        position: absolute;
        transform-origin: left center;
        transform: rotate(0deg);
        transition: .25s ease-in-out;
        width: 100%;

        &:nth-child(1) {
          top: 0px;
        }

        &:nth-child(2) {
          top: 8px;
        }

        &:nth-child(3) {
          top: 16px;
        }
      }

      &.open {
        span:nth-child(1) {
          left: 5px;
          top: -3px;
          transform: rotate(45deg);
        }

        span:nth-child(2) {
          opacity: 0;
          width: 0%;
        }

        span:nth-child(3) {
          left: 5px;
          top: 18px;
          transform: rotate(-45deg);
        }
      }
    }

    .search-wrapper {
      padding: 20px;

      .search-img,
      .search-clear {
        background: white;
        cursor: pointer;
        height: calc(80% - 1px);
        padding: 0.4375rem 0;
        position: absolute;
        right: 0;
        top: 10%;
        z-index: 1;
      }

      .search-clear {
        display: none;
      }

      .search-input {
        cursor: pointer;
        background: transparent;
        outline: none;
        position: absolute;
        right: 0;
        top: 0;
        z-index: 2;
        transition: all .5s;

        &:focus,
        &:not(:placeholder-shown) {
          @apply border-b;
          cursor: auto;
          opacity: 1;
          width: 100%;
          background: white;
          z-index: 1;
        }

        &:not(:placeholder-shown) {
          & + .search-img {
            display: none;
          }

          & ~ .search-clear {
            display: inline-block;
          }
        }
      }
    }
  }
</style>
