<template>
<nav class="flex items-center justify-between flex-wrap border-nav xl:border-b xl:m-0 px-6 py-4 xl:p-0 shadow-md xl:shadow-none">
  <a href="/" class="nav-icon">
    <img class="xl:absolute fill-current mr-2 w-12" src="../../assets/img/logo.svg"/>
  </a>
  <div class="block lg:hidden">
    <button @click="toggle" :class="menuToggleClass" class="nav-menu flex items-center outline-none">
      <span></span>
      <span></span>
      <span></span>
    </button>
  </div>
  <div :class="navToggleClass" class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
    <div class="text-base lg:flex-grow">
      <a href="#" class="block mt-4 lg:inline-block lg:mt-0 mr-4">Leaders</a>
      <a href="#" class="block mt-4 lg:inline-block lg:mt-0 mr-4">Political parties</a>
    </div>
    <div>
      <ul class="list-reset lg:flex lg:items-center">
        <li>
          <a href="#" class="block lg:px-4 lg:py-2 lg:border-b border-transparent hover:border-primary mt-4 lg:mt-0">About</a>
        </li>
        <li>
          <a href="#" class="block lg:px-4 lg:py-2 lg:border-b border-transparent hover:border-primary mt-4 lg:mt-0">Contact</a>
        </li>
        <li>
          <a href="#" class="px-4 py-2 mt-4 lg:ml-4 lg:mt-0 btn-primary-outline block leading-tight">Donate</a>
        </li>
        <li class="lg:mr-9">
          <a href="#" class="inline-block lg:px-8 px-3 py-2 mt-4 lg:mt-0 align-bottom lg:border-r lg:border-l-0 lg:border-t-0 lg:border-b-0 border w-full">
            <img src="../../assets/img/search.svg"/>
          </a>
        <li>
          <a href="#" class="mt-4 px-4 py-2 lg:mt-0 btn-primary block leading-tight">Sign up</a>
        </li>
        <li>
          <a href="#" class="mt-4 px-4 py-2 lg:mt-0 border border-primary lg:border-b lg:border-transparent hover:border-primary w-full block leading-tight font-circular">Log in</a>
        </li>
        <li>
          <a href="#" class="flex lg:py-2 mt-4 lg:ml-9 lg:mt-0 align-bottom border lg:border-0 py-3 px-2 justify-between">
            <img class="pr-4" src="../../assets/img/flags/nigeria.svg"/>
            <img src="../../assets/img/chevron-down.svg"/>
          </a>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      open: false,
    };
  },
  computed: {
    navToggleClass() {
      if (this.open) return 'block';
      return 'hidden';
    },
    menuToggleClass() {
      if (this.open) return 'open';
      return '';
    },
  },
  methods: {
    toggle() {
      this.open = !this.open;
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
    }

    .nav-icon img {
      @screen xl {
        width: 6.875rem;
        top: 1.315rem;
        left: 3.95rem;
      }
    }

    .nav-menu {
      width: 30px;
      height: 16px;
      position: relative;
      transform: rotate(0deg);
      transition: .5s ease-in-out;
      cursor: pointer;

      span {
        display: block;
        position: absolute;
        height: 1px;
        width: 100%;
        background: black;
        border-radius: 4px;
        opacity: 1;
        left: 0;
        transform: rotate(0deg);
        transition: .25s ease-in-out;
        transform-origin: left center;

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
          transform: rotate(45deg);
          top: -3px;
          left: 5px;
        }

        span:nth-child(2) {
          width: 0%;
          opacity: 0;
        }

        span:nth-child(3) {
          transform: rotate(-45deg);
          top: 18px;
          left: 5px;
        }
      }
    }
  }
</style>
