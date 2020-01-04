<template>
<nav class="xl:m-0 px-6 xl:p-0">
  <div class="nav-content py-4 px-0 border-gray-200 border-b w-full flex items-center flex-wrap" :class="menuToggleClass">
    <router-link :to="{ name: 'home' }" @click.native="closeNav" class="nav-icon"><img class="xl:absolute mr-2 w-12 bg-white z-10" src="@/assets/img/logo.svg"/></router-link>
    <div :class="navToggleClass" class="w-full block flex-grow xl:flex xl:items-center xl:w-auto mt-2 xl:mt-0">
      <div class="text-base xl:flex-grow">
        <a class="block mt-4 xl:inline-block xl:mt-0 mr-4">
          <our-dropdown class="mr-4 xl:visible" width="w-40" heading="Leaders" alignRight listClass="leaders-dropdown-list">
            <our-dropdown-item isLink :to="{ name: 'politicians' }" @click.native="closeNav">Current leaders</our-dropdown-item>
            <our-dropdown-item isLink :to="{ name: '' }" @click.native="closeNav">Upcoming leaders</our-dropdown-item>
            <our-dropdown-item isLink :to="{ name: '' }" @click.native="closeNav">Past leaders</our-dropdown-item>
          </our-dropdown>
        </a>
        <router-link :to="{ name: 'political-parties' }" @click.native="closeNav" class="block mt-4 xl:inline-block xl:mt-0 mr-4">Political parties</router-link>
      </div>
      <div>
        <ul class="relative xl:inline-flex xl:items-center">
          <li>
            <router-link :to="{ name: 'about-us' }" @click.native="closeNav" class="block xl:px-4 xl:py-2 xl:border-b border-transparent hover:border-primary mt-4 xl:mt-0">About</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'contact-us' }" @click.native="closeNav" class="block xl:px-4 xl:py-2 xl:border-b border-transparent hover:border-primary mt-4 xl:mt-0">Contact</router-link>
          </li>
          <li class="donate-wrapper">
            <router-link :to="{ name: '' }" @click.native="closeNav" class="px-4 py-2 mt-4 xl:ml-4 xl:mt-0 btn-primary-outline block leading-tight">Donate</router-link>
          </li>
          <li class="xl:absolute xl:ml-4 h-12 xl:border-r xl:border-l-0 xl:border-t-0 xl:border-b-0 border right-0 mt-4 xl:mt-0">
            <div class="search-wrapper h-full relative mr-2 xl:mr-8">
              <input v-model="searchQuery" type="text" ref="search" class="search-input h-full w-full xl:w-6 xl:opacity-0 pr-6 xl:pl-0 pl-4 py-2" placeholder="Search" />
              <img class="search-img" src="@/assets/img/search.svg"/>
              <img @click="clearSearch" class="search-clear" src="@/assets/img/close.svg"/>
            </div>
          </li>
        </ul>
        <ul class="xl:inline-flex xl:items-center">
          <li class="xl:ml-9 xl:mr-2" v-if="!isLoggedIn">
            <router-link :to="{ name: 'sign-up' }" @click.native="closeNav" class="mt-4 px-4 py-2 xl:mt-0 btn-primary block leading-tight">Sign up</router-link>
          </li>
          <li v-if="!isLoggedIn">
            <router-link :to="{ name: 'sign-in' }" @click.native="closeNav" class="mt-4 px-4 py-3 xl:mt-0 border border-primary xl:border-b xl:border-transparent hover:border-primary block leading-tight font-circular">Log in</router-link>
          </li>
        </ul>
      </div>
    </div>
    <ul class="w-full xl:w-auto xl:flex items-center" :class="openNav ? 'h-auto' : 'h-0'">
      <li class="profile-wrapper xl:top-0 xl:relative absolute right-0 w-auto pl-8 pr-4 h-14 flex items-center font-circular" v-if="isLoggedIn">
        <div class="notification bg-gray-200 rounded-full text-xs flex xl:visible items-center justify-center mr-5 relative leading-tight" :class="profileShowClass">12</div>
        <our-dropdown class="mr-4 xl:visible" :class="profileShowClass" width="w-56" heading="Profile" :imageSrc="require('@/assets/img/user.svg')">
          <our-dropdown-item>
            <p>Signed in as {{ user.email }}</p>
            <p v-if="user.joinedBy" class="text-gray-500 text-xs pt-2">via {{ user.joinedBy }}</p>
          </our-dropdown-item>
          <our-dropdown-divider />
          <our-dropdown-item isLink :to="{ name: 'account-home' }" @click.native="closeNav">Account preferences</our-dropdown-item>
          <our-dropdown-item isLink :to="{ name: 'account-subscriptions' }" @click.native="closeNav">Manage subscriptions</our-dropdown-item>
          <our-dropdown-divider />
          <our-dropdown-item isLink :to="{ name: '' }" @click.native="closeNav">Sign out</our-dropdown-item>
        </our-dropdown>
        <div class="block xl:hidden mr-2">
          <button @click="toggleNav" :class="menuToggleClass" class="nav-menu flex items-center focus:outline-none">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </li>
      <li class="xl:visible" :class="profileShowClass">
        <our-country-selector v-model="country" />
      </li>
    </ul>
  </div>
</nav>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'our-navbar',
  data() {
    return {
      openNav: false,
      searchQuery: '',
      country: 'ngr',
    };
  },
  methods: {
    toggleNav() {
      this.openNav = !this.openNav;
    },
    closeNav() {
      this.openNav = false;
    },
    clearSearch() {
      this.$refs.search.focus();
      this.searchQuery = '';
    },
  },
  computed: {
    ...mapGetters([
      'isLoggedIn',
      'user',
    ]),
    navToggleClass() {
      if (this.openNav) return 'block';
      return 'hidden';
    },
    profileShowClass() {
      if (this.openNav) return 'visible';
      return 'invisible';
    },
    menuToggleClass() {
      if (this.openNav) return 'open';
      return '';
    },
  },
};
</script>

<style lang="scss" scoped>
  nav {
    position: sticky;
    top: 0;
    z-index: 100;
    background: white;

    @screen xl {
      background: transparent;
      margin-left: 13.65rem;
      margin-right: 4.25rem;
      min-height: 6.25rem;
      position: initial;

      .nav-icon img {
        left: 3.95rem;
        top: 1.315rem;
        width: 6.875rem;
        z-index: 0;
      }
    }

    .nav-content {
      background: white;

      &.open {
        @apply fixed w-full min-h-screen overflow-scroll right-0 bottom-0 top-0 px-6;

        @screen xl {
          @apply bg-transparent px-0 overflow-auto;

          position: initial;
          min-height: initial;
        }
      }
    }

    .nav-menu {
      cursor: pointer;
      height: 16px;
      position: relative;
      transform: rotate(0deg);
      transition: .5s ease-in-out;
      width: 24px;

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
          top: -2px;
          transform: rotate(45deg);
        }

        span:nth-child(2) {
          opacity: 0;
          width: 0%;
        }

        span:nth-child(3) {
          left: 5px;
          top: 15px;
          transform: rotate(-45deg);
        }
      }
    }

    /deep/.leaders-dropdown-list {
      @screen lg {
        margin-left: -1rem;
      }
    }

    .donate-wrapper {
      @screen xl {
        margin-right: 5.7rem;
      }
    }

    .profile-wrapper {
      top: 1.25rem;

      .notification {
        position: relative;
        width: 1.875rem;
        height: 1.875rem;

        &:after {
          content: '';
          position: absolute;
          border-radius: 50%;
          background-color: #f14336;
          height: 0.6875rem;
          width: 0.6875rem;
          top: -0.025rem;
          right: -0.025rem;
        }
      }

      @screen xl {
        top: 0;
      }
    }

    .search-wrapper {
      padding: 20px;

      .search-img,
      .search-clear {
        background: white;
        cursor: pointer;
        height: calc(65% - 1px);
        position: absolute;
        right: 0;
        top: 17.5%;
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
          cursor: auto;
          opacity: 1;
          width: 100%;
          min-width: 100%;
          background: white;
          z-index: 1;

          @screen xl {
            @apply border-b;
            width: 500px;
          }
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
