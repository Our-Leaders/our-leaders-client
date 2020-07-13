<template>
<nav class="xl:m-0 px-3 xl:p-0" :class="navClass">
  <div class="nav-content py-3 xl:py-4 px-0 border-gray-200 border-b w-full flex items-center xl:mt-0" :class="menuToggleClass">
    <div class="block xl:hidden mr-4">
      <button @click="toggleNav" :class="profileShowClass" class="nav-menu flex items-center focus:outline-none">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
    <router-link :class="profileShowClass" :to="{ name: 'home' }" @click.native="closeNav" class="nav-icon">
      <img class="mr-2 w-9 bg-white z-20" src="@/assets/img/logo.svg"/>
    </router-link>
    <div :class="navToggleClass" class="sticky w-full top-0 text-center border-gray-200 border-b xl:hidden bg-white z-10 flex justify-center items-center">
      <p class="py-5 uppercase font-circular text-sm">Our Leaders.Africa</p>
      <img @click="toggleNav" class="absolute right-0" src="@/assets/img/close.svg"/>
    </div>
    <div class="w-full block flex-grow flex flex-col xl:flex-row xl:items-center xl:w-auto">
      <div :class="navToggleClass" class="w-full block flex-grow xl:flex xl:items-center text-center xl:text-left xl:w-auto mt-2 xl:mt-0 order-1 xl:order-0">
        <div class="text-base xl:flex-grow">
          <a class="block mt-4 hidden xl:inline-block xl:mt-0 xl:mr-4">
            <our-dropdown class="xl:mr-4 xl:visible" width="w-40" heading="Leaders" alignRight showOnHover listClass="leaders-dropdown-list">
              <our-dropdown-item isLink :to="{ name: 'politicians' }" @click.native="closeNav">Current leaders</our-dropdown-item>
              <our-dropdown-item isLink :to="{ name: 'politicians', query: { status: 'upcoming' } }" @click.native="closeNav">Aspirants</our-dropdown-item>
              <our-dropdown-item isLink :to="{ name: 'politicians', query: { status: 'past' } }" @click.native="closeNav">Past leaders</our-dropdown-item>
            </our-dropdown>
          </a>
          <div class="xl:hidden mobile-nav-divider">
            <router-link :to="{ name: 'politicians' }" @click.native="closeNav" class="block mt-4 xl:inline-block xl:mt-0 xl:mr-4">Current leaders</router-link>
            <router-link :to="{ name: 'politicians', query: { status: 'upcoming' } }" @click.native="closeNav" class="block mt-4 xl:inline-block xl:mt-0 xl:mr-4">Aspirants</router-link>
            <router-link :to="{ name: 'politicians', query: { status: 'past' } }" @click.native="closeNav" class="block mt-4 xl:inline-block xl:mt-0 xl:mr-4">Past leaders</router-link>
          </div>
          <router-link :to="{ name: 'political-parties' }" @click.native="closeNav" class="block mt-4 xl:inline-block xl:mt-0 xl:mr-4 mobile-nav-divider">Political Parties</router-link>
        </div>
        <div>
          <ul class="relative xl:inline-flex xl:items-center">
            <li>
              <router-link :to="{ name: 'about-us' }" @click.native="closeNav" class="block xl:px-4 xl:py-2 xl:border-b border-transparent hover:border-primary mt-4 xl:mt-0">About Us</router-link>
            </li>
            <li class="mobile-nav-divider">
              <router-link :to="{ name: 'contact-us' }" @click.native="closeNav" class="block xl:px-4 xl:py-2 xl:border-b border-transparent hover:border-primary mt-4 xl:mt-0">Contact Us</router-link>
            </li>
            <li class="donate-wrapper hidden">
              <router-link :to="{ name: 'donate' }" @click.native="closeNav" class="px-4 py-2 mt-4 xl:ml-4 xl:mt-0 btn-primary-outline btn-sm block leading-tight">Donate</router-link>
            </li>
            <li class="xl:absolute border-r xl:ml-4 h-12 right-0 mt-4 xl:mt-0 hidden xl:inline-block">
              <div class="search-wrapper h-full relative mr-2 xl:mr-8">
                <input v-model="searchQuery" type="text" ref="search" class="search-input h-full w-full xl:w-6 xl:opacity-0 pr-6 xl:pl-0 pl-4 py-2" @keyup.enter="searchPoliticians" placeholder="Search" />
                <img class="search-img" src="@/assets/img/search.svg"/>
                <img @click="clearSearch" class="search-clear" src="@/assets/img/close.svg"/>
              </div>
            </li>
          </ul>
          <ul class="xl:inline-flex xl:items-center">
            <li class="xl:ml-9 xl:mr-2" v-if="!isLoggedIn">
              <router-link :to="{ name: 'sign-up' }" @click.native="closeNav" class="mt-4 px-4 py-2 xl:mt-0 btn-primary btn-sm inline-block leading-tight w-48 xl:w-auto">Sign up</router-link>
            </li>
            <li v-if="!isLoggedIn" class="mobile-nav-divider">
              <router-link :to="{ name: 'sign-in' }" @click.native="closeNav" class="mt-2 px-4 py-3 xl:mt-0 border xl:border-b border-transparent hover:border-primary inline-block leading-tight font-circular w-48 xl:w-auto">Log in</router-link>
            </li>
            <li v-if="isLoggedIn" class="xl:hidden">
              <a @click="signOut" class="mt-4 px-4 py-3 xl:mt-0 border border-gray-96 xl:border-b xl:border-transparent hover:border-primary inline-block leading-tight font-circular w-48 xl:w-auto">Log out</a>
            </li>
            <li class="xl:hidden">
              <router-link :to="{ name: 'donate' }" @click.native="closeNav" class="px-4 py-2 mt-4 xl:ml-4 xl:mt-0 btn-primary-outline btn-sm inline-block leading-tight w-48 xl:w-auto">Donate</router-link>
            </li>
          </ul>
        </div>
      </div>
      <ul class="w-full xl:w-auto flex items-center order-0 xl:order-1" :class="openNav ? 'h-auto justify-center' : 'h-0 justify-end'">
        <li :class="profileShowClass" class="profile-wrapper xl:top-0 xl:relative right-0 w-auto h-14 flex items-center font-circular xl:hidden">
          <div class="search-wrapper h-full relative xl:mr-8">
            <input v-model="searchQuery" type="text" ref="search" :class="searchClass" class="search-input mobile-search h-full w-full xl:w-6 xl:opacity-0 pr-6 xl:pl-0 pl-4 py-2"  @keyup.enter="searchPoliticians" placeholder="Search" />
            <img v-if="!search" @click="expandSearch" class="search-img z-10" src="@/assets/img/search.svg"/>
            <img v-else @click="clearSearch" class="search-clear" src="@/assets/img/close.svg"/>
          </div>
        </li>
        <li v-if="!isLoggedIn && !search" :class="profileShowClass" class="profile-wrapper right-0 w-auto pl-4 h-14 flex items-center font-circular xl:hidden">
          <our-dropdown class="xl:visible" listClass="unknown-profile-dropdown" width="w-56" :imageSrc="require('@/assets/img/user-primary.svg')">
            <our-dropdown-item isLink :to="{ name: 'sign-up' }" class="btn-primary btn-sm block leading-tight h-10 flex items-center justify-center" @click.native="closeNav">Sign up</our-dropdown-item>
            <our-dropdown-item isLink :to="{ name: 'sign-in' }" class="py-2 hover:border-primary block leading-tight font-circular flex items-center justify-center" @click.native="closeNav">Log in</our-dropdown-item>
          </our-dropdown>
        </li>
        <li v-if="isLoggedIn && !search" :class="profileShowClass" class="profile-wrapper xl:top-0 xl:relative right-0 w-auto pl-4 h-14 flex items-center font-circular">
          <our-dropdown
            class="notification flex-col bg-gray-200 rounded-full text-xs flex xl:visible justify-center mr-5 relative leading-tight"
            :class="{'active': hasNotifications}"
            :heading="`${totalNotifications}`"
            padding="py-0">
            <our-dropdown-item v-if="!hasNotifications">
              <p class="text-center">No new notifications.</p>
            </our-dropdown-item>
            <our-dropdown-item v-for="(notification, index) in notifications" :key="index" isLink :to="getUrl(notification)">
              <p :class="{'text-gray-300': notification.read}" @click="toggleNotificationRead(index)">{{notification.message}}</p>
            </our-dropdown-item>
            <our-dropdown-item v-if="hasNotifications">
              <p class="text-gray-300 text-center" @click="clearNotifications">Clear Notifications</p>
            </our-dropdown-item>
          </our-dropdown>
          <our-dropdown class="ml-1 xl:ml-0 xl:mr-3 xl:visible" width="w-56" listClass="profile-dropdown" :imageSrc="user.profileImage ? user.profileImage : require('@/assets/img/user-primary.svg')">
            <our-dropdown-item>
              <p>Signed in as {{ user.email }}</p>
              <p v-if="user.joinedBy" class="text-gray-500 text-xs pt-2">via {{ user.joinedBy }}</p>
            </our-dropdown-item>
            <our-dropdown-divider />
            <our-dropdown-item isLink :to="{ name: 'account-home' }" @click.native="closeNav">Account preferences</our-dropdown-item>
            <our-dropdown-item isLink :to="{ name: 'account-subscriptions' }" @click.native="closeNav">Manage subscriptions</our-dropdown-item>
            <our-dropdown-divider />
            <our-dropdown-item isLink :to="{ name: '' }" @click.native="signOut">Sign out</our-dropdown-item>
          </our-dropdown>
        </li>
        <li class="xl:visible -mb-4 xl:mb-0 xl:mt-0 xl:-mr-4" :class="navToggleClass">
          <our-country-selector v-model="country" />
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'our-navbar',
  data() {
    return {
      country: 'ngr',
      notificationsServices: this.$serviceFactory.notifications,
      openNav: false,
      searchQuery: '',
      search: false,
      shrinkIcon: false,
    };
  },
  created() {
    this.shrinkIcon = !this.shrinkMode;

    window.addEventListener('scroll', this.handleScroll, { passive: true });
    if (this.isLoggedIn) {
      this.getNotifications();
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    ...mapActions([
      'clearNotifications',
      'displayError',
      'displaySuccess',
      'setNotifications',
      'toggleNotificationRead',
    ]),
    async getNotifications() {
      try {
        const response = await this.notificationsServices.getNotifications();

        if (response.data.notifications.length > 0) {
          this.setNotifications(response.data.notifications.map((notification) => {
            const parsedNotification = {
              id: notification.id,
              url: notification.url,
              message: notification.message,
              entityId: notification.entityId,
              entityType: notification.entityType,
              read: false,
            };
            return parsedNotification;
          }));
        }
      } catch (error) {
        this.displayError({
          message: 'Couldn\'t retrieve your notifications at this time.',
        });
      }
    },
    toggleNav() {
      this.openNav = !this.openNav;
    },
    closeNav() {
      this.openNav = false;
    },
    clearSearch() {
      this.$refs.search.focus();
      this.searchQuery = '';
      this.search = false;
    },
    expandSearch() {
      this.search = true;
      this.$refs.search.focus();
    },
    getUrl(notification) {
      return notification.entityType === 'politician' ? `/politicians/${notification.entityId}` : `/political-parties/${notification.entityId}`;
    },
    searchPoliticians() {
      this.$router.push(`/politicians?search=${this.searchQuery}`);
    },
    signOut() {
      this.$store.commit('clearJWT');
      this.$store.commit('clearCurrentUser');
      this.closeNav();
      window.location.reload();
    },
    handleScroll() {
      if (this.shrinkMode) {
        const distanceY = window.scrollY;
        const shouldShrink = distanceY >= 20;
        if (this.shrinkIcon !== shouldShrink) {
          this.shrinkIcon = shouldShrink;
        }
      }
    },
  },
  computed: {
    ...mapGetters([
      'isLoggedIn',
      'notifications',
      'shrinkMode',
      'user',
    ]),
    hasNotifications() {
      return this.notifications.length > 0;
    },
    navToggleClass() {
      if (this.openNav) return 'block';
      return 'hidden xl:block';
    },
    profileShowClass() {
      if (this.openNav) return 'hidden xl:initial';
      return '';
    },
    menuToggleClass() {
      if (this.openNav) return 'flex-wrap open -mt-3';
      return '';
    },
    searchClass() {
      if (this.search) return 'mobile-search-expanded';
      return '';
    },
    navClass() {
      let cx = 'bg-white xl:bg-transparent';
      if (this.$route.name !== 'home') {
        cx = 'bg-white';
      }
      if (this.shrinkIcon) {
        cx = 'nav-shrinked bg-white';
      }
      return cx;
    },
    totalNotifications() {
      return this.notifications.filter(notification => !notification.read).length;
    },
  },
  watch: {
    shrinkMode(val) {
      this.shrinkIcon = !val;
    },
  },
};
</script>

<style lang="scss" scoped>
  nav {
    position: sticky;
    top: 0;
    z-index: 100;

    &.nav-shrinked {
      @screen xl {
        margin: 0;
        background: white;

        .nav-content {
          @apply shadow-primary;
          padding: 0.25rem 4.25rem;
        }

        .nav-icon {
          img {
            width: 5rem;
            margin-top: -0.5rem;
            background: transparent;
          }
        }
      }

      @screen xxl {
        .nav-content {
          padding: 0.25rem 20rem;
        }
      }
    }

    @screen xl {
      margin: 0 4.25rem;

      .nav-icon {
        display: inline-block;
        height: 2rem;

        img {
          width: 9rem;
          padding: 0.3125rem;
          padding-right: 2rem;
          margin-right: -0.3125rem;
          transition: width 0.5s, margin 0.5s ease-in-out;
        }
      }
    }

    @screen xxl {
      margin: 0 20rem;
    }

    .nav-content {
      @screen xl {
        background: transparent;
      }

      &.open {
        @apply fixed w-full min-h-screen overflow-scroll right-0 bottom-0 top-0 px-3 bg-white block;

        @screen xl {
          @apply bg-transparent px-0 overflow-visible;

          position: initial;
        }
      }
    }

    .nav-menu {
      cursor: pointer;
      height: 1rem;
      position: relative;
      transform: rotate(0deg);
      transition: .5s ease-in-out;
      width: 20px;

      span {
        background: black;
        border-radius: 0.25rem;
        display: block;
        height: 1.5px;
        left: 0;
        opacity: 1;
        position: absolute;
        transform-origin: left center;
        transform: rotate(0deg);
        transition: .25s ease-in-out;
        width: 100%;

        &:nth-child(1) {
          top: 0;
        }

        &:nth-child(2) {
          top: 0.5rem;
        }

        &:nth-child(3) {
          top: 1rem;
          width: 80%;
        }
      }
    }

    .mobile-nav-divider {
      position: relative;
      margin-bottom: 2rem;

      &:after {
        @apply bg-gray-db;

        content: '';
        height: 1px;
        width: 3.125rem;
        bottom: -1rem;
        left: calc(50% - 1.5625rem);
        position: absolute
      }

      @screen xl {
        margin-bottom: 0;

        &:after {
          content: none;
        }
      }
    }

    /deep/.leaders-dropdown-list {
      @screen lg {
        margin-left: -1rem;
      }
    }

    /deep/.unknown-profile-dropdown {
      padding: 2rem;
    }

    /deep/.profile-dropdown,
    /deep/.unknown-profile-dropdown {
      top: calc(100% + 1.45rem);
      right: -0.75rem;
      z-index: -1;

      @screen xl {
        right: -0.5rem;
        z-index: inherit;
      }
    }

    .donate-wrapper {
      @screen xl {
        margin-right: 5.7rem;
        display: initial;
      }
    }

    .profile-wrapper {
      top: calc(50% - 1.25rem);

      .notification {
        position: relative;
        width: 1.875rem;
        height: 1.875rem;

        &.active{
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
        height: 36px;
        position: absolute;
        right: 0;
        top: calc(50% - 18px);
        z-index: 1;
        padding: 0.25rem;
      }

      .search-clear {
        @screen xl {
          display: none;
        }
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
        .search-img:focus,
        &:not(:placeholder-shown),
        &.mobile-search-expanded {
          @apply cursor-auto opacity-100 w-full min-w-full bg-white;
          z-index: 1;

          @screen xl {
            @apply border-b;
            width: 31.25rem;
          }
        }

        &.mobile-search {
          z-index: 0;

          &.mobile-search-expanded {
            z-index: 1;
            width: calc(100vw - 1.5rem);
            padding-right: 2rem;
            padding-left: 0.5rem;
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
