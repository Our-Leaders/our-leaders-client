<template>
  <button class="relative text-left focus:outline-none" :class="parentWidth || 'w-auto'" @focusout="closeDropdown">
    <div v-if="imageSrc" @click="toggleDropdown" class="relative z-10 block h-10 w-10 bg-gray-200 rounded-full overflow-hidden">
      <img class="h-full w-full object-cover" :src="imageSrc" alt="avatar">
    </div>
    <div v-if="!imageSrc" @click="toggleDropdown" class="relative block lg:py-4">
      <span class="h-full w-full object-cover">{{ heading }}</span>
      <img v-if="showIcon" class="side-arrow" src="../../assets/img/angle-arrow-down.svg"/>
    </div>
    <transition name="fade" mode="out-in">
      <div class="fixed lg:absolute w-full dropdown p-6 lg:px-4 lg:py-3 right-0 bg-white" :class="`lg:${width || 'w-64'} ${alignClass} ${listClass} ${dropdownListClass}`" v-if="isOpen">
        <div class="lg:hidden flex justify-between items-center font-circular mb-4">
          <p>{{ heading }}</p>
          <img class="close-button" @click="toggleDropdown" src="@/assets/img/close.svg"/>
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
      required: true,
    },
    alignRight: {
      type: Boolean,
    },
    listClass: {
      type: String,
      default: '',
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
  },
  computed: {
    alignClass() {
      if (this.alignRight) {
        return 'left-0';
      }
      return 'right-0';
    },
    dropdownListClass() {
      if (this.imageSrc) {
        return 'image-dropdown-list';
      }
      return '';
    },
  },
};
</script>

<style lang="scss" scoped>
  .dropdown {
    overflow-y: scroll;
    top: 0;
    z-index: 100;

    .close-button {
      margin-right: -6px;
      margin-top: -2px;
    }

    @screen lg {
      top: 3.5rem;
      max-height: 50vh;
      box-shadow: 0px 12px 52px rgba(0, 0, 0, 0.1);

      &.image-dropdown-list {
        top: 2.9rem;
      }
    }
  }

  .side-arrow {
    bottom: 22px;
    position: absolute;
    right: 0;
  }

  @media only screen and (max-device-width: 768px) {
    .dropdown {
      height: 100%;
      position: fixed;
      right: 0;
      top: 0;
      width: 100%;
    }

    .side-arrow {
      bottom: 5px;
    }
  }
</style>
