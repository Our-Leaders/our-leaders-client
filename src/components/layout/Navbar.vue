<template>
<nav class="flex items-center justify-between flex-wrap border-nav border-b lg:m-0">
  <div class="nav-icon">
    <img class="absolute fill-current mr-2" src="../../assets/img/logo.svg"/>
  </div>
  <div class="block lg:hidden">
    <button @click="toggle" class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
      <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
    </button>
  </div>
  <div :class="toggleClass" class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
    <div class="text-base lg:flex-grow">
      <a href="#responsive-header" class="nav-link block mt-4 lg:inline-block lg:mt-0 hover:text-white mr-4">
        Leaders
      </a>
      <a href="#responsive-header" class="nav-link block mt-4 lg:inline-block lg:mt-0 hover:text-white mr-4">
        Political parties
      </a>
    </div>
    <div>
      <ul class="list-reset md:flex md:items-center">
        <li>
          <a href="#" class="nav-link inline-block px-4 py-2 leading-none hover:font-bold mt-4 lg:mt-0">About</a>
        </li>
        <li>
          <a href="#" class="nav-link inline-block px-4 py-2 leading-none hover:font-bold mt-4 lg:mt-0">Contact</a>
        </li>
        <li>
          <a href="#" class="nav-button px-4 py-2 mt-4 lg:ml-4 lg:mt-0 btn-primary-outline">Donate</a>
        </li>
        <li class="mr-9">
          <a href="#" class="nav-search inline-block px-8 py-2 leading-none mt-4 lg:mt-0 align-bottom border-r">
            <img src="../../assets/img/search.svg"/>
          </a>
        <li>
          <a href="#" class="nav-button nav-signup mt-4 px-4 py-2 lg:mt-0 btn-primary">Sign up</a>
        </li>
        <li>
          <a href="#" class="nav-button inline-block px-4 py-2 leading-none hover:text-white mt-4 lg:mt-0">Log in</a>
        </li>
        <li>
          <a href="#" class="nav-search flex py-2 leading-none mt-4 ml-9 lg:mt-0 align-bottom">
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
    toggleClass() {
      if (this.open) return 'block';
      return 'hidden';
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
    @screen lg {
      margin-left: 13.65rem;
      margin-right: 4.25rem;
      min-height: 6.25rem;
    }

    .nav-link,
    .nav-button {
      font-weight: 300;
    }

    .nav-button {
      font-family: 'Circular Std';
    }

    .nav-icon img {
      width: 6.875rem;
      top: 1.315rem;
      left: 3.95rem;
    }

    .nav-signup {
      color: white;
    }
  }
</style>
