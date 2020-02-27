<template>
  <button
    class="relative text-left focus:outline-none"
    :class="parentWidth || 'w-auto'"
    @focusout="closeDropdown"
    @mouseenter="showOnHover && openDropdown()"
    @mouseleave="showOnHover && closeDropdown()"
  >
    <div v-if="imageSrc" @click="!showOnHover && toggleDropdown()" class="relative z-20 block h-10 w-10 bg-gray-200 rounded-full overflow-hidden">
      <img class="h-full w-full object-cover" :src="imageSrc" alt="avatar">
    </div>
    <div v-if="!imageSrc" @click="!showOnHover && toggleDropdown()" class="relative block xl:py-4">
      <span class="h-full w-full object-cover font-pt">{{ heading }}</span>
      <img v-if="showIcon" class="side-arrow" src="../../assets/img/angle-arrow-down.svg"/>
    </div>
    <transition name="fade" mode="out-in">
      <div class="p-3 xl:px-4 right-0 bg-white -mt-3" :class="`${width || 'w-64'} ${alignClass} ${listClass} ${dropdownListClass}`" v-if="isOpen">
        <div class="dropdown-mobile-header mb-4 border-gray-200 border-b sticky w-full top-0 bg-white z-10 flex justify-center items-center">
          <p class="py-5 uppercase font-circular text-sm">{{ heading }}</p>
          <img @click="closeDropdown" class="absolute right-0" src="@/assets/img/close.svg"/>
        </div>
        <ul>
          <slot />
        </ul>
      </div>
    </transition>
  </button>
</template>

<script>
export default {
  props: {
    showIcon: {
      default: false,
      type: Boolean,
    },
    showOnHover: {
      default: false,
      type: Boolean,
    },
    parentWidth: {
      type: String,
    },
    width: {
      type: String,
    },
    imageSrc: {
      type: String,
    },
    heading: {
      type: String,
    },
    alignRight: {
      type: Boolean,
    },
    listClass: {
      type: String,
      default: '',
    },
    fillScreenOnMobile: {
      default: false,
      type: Boolean,
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
        this.closeDropdown();
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
    closeDropdown() {
      this.isOpen = false;
    },
    openDropdown() {
      this.isOpen = true;
    },
  },
  computed: {
    alignClass() {
      if (this.alignRight) {
        return 'left-0';
      }
      return 'right-0';
    },
    dropdownListClass() {
      let cx = 'dropdown';

      if (this.imageSrc) {
        cx += ' image-dropdown-list';
      }
      if (this.fillScreenOnMobile) {
        cx += ' mobile-dropdown';
      }
      return cx;
    },
  },
};
</script>

<style lang="scss" scoped>
  .dropdown {
    @apply shadow-shallow;

    @screen xl {
      @apply shadow-primary;
    }

    overflow-y: auto;
    position: absolute;
    top: calc(100% + 0.75rem);
    z-index: 100;

    .dropdown-mobile-header {
      display: none;
    }

    .close-button {
      margin-right: -6px;
      margin-top: -2px;
    }

    @screen lg {
      top: 2rem;
      max-height: 50vh;

      &.image-dropdown-list {
        top: calc(100% + 1.5rem);
      }
    }

    @screen xl {
      top: 4.25rem;
    }
  }

  .side-arrow {
    bottom: 22px;
    position: absolute;
    right: 0;
  }

  @media only screen and (max-device-width: 768px) {
    .dropdown.mobile-dropdown {
      height: calc(100vh + 0.75rem);
      position: fixed;
      right: 0;
      top: 0;
      width: 100%;
      box-shadow: none;

      .dropdown-mobile-header {
        display: flex;
      }
    }

    .side-arrow {
      bottom: 5px;
    }
  }
</style>
