<template>
  <div class="relative">
    <button @click="isOpen = !isOpen" class="relative z-10 block h-10 w-10 bg-gray-200 rounded-full overflow-hidden focus:outline-none">
      <img class="h-full w-full object-cover" src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80" alt="avatar">
    </button>
    <button v-if="isOpen" @click="isOpen = false" tabindex="-1" class="fixed inset-0 h-full w-full cursor-default"></button>
    <div class="fixed lg:absolute w-full dropdown p-6 lg:px-4 lg:py-3 right-0 bg-white" :class="`lg:${width || 'w-64'}`" v-if="isOpen">
      <div class="lg:hidden flex justify-between items-center font-circular mb-4">
        <p>Profile</p>
        <img @click="toggleDropdown" src="@/assets/img/close.svg"/>
      </div>
      <ul>
        <slot />
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  created() {
    const handleEscape = (e) => {
      if (e.key === 'Esc' || e.key === 'Escape') {
        this.isOpen = false;
      }
    };
    document.addEventListener('keydown', handleEscape);
    this.$once('hook:beforeDestroy', () => {
      document.removeEventListener('keydown', handleEscape);
    });
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style lang="scss" scoped>
  .dropdown {
    top: 0;
    height: 100vh;
    z-index: 100;
    overflow-y: scroll;

    @screen lg {
      top: 3rem;
      height: auto;
      box-shadow: 0px 12px 52px rgba(0, 0, 0, 0.1);
    }
  }
</style>
