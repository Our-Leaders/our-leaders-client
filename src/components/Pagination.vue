<template>
  <ul>
    <li
      :class="{
        'p-box': true,
        'inactive': atBeginning
      }"
      @click="previous">
      <span class="left-arrow"></span>
    </li>
    <!-- More logic to be done on what numbers to display -->
    <li :class="{
      'p-box': true,
      'active': current == page
      }"
      v-for="(page, i) in pages"
      :key="i"
      @click="$emit('change', page)">
      <span :class="{
        'number font-semibold': true,
        }">
        {{page + 1}}
      </span>
    </li>
    <li :class="{
      'p-box': true,
      'inactive': atEnd
      }"
      @click="next">
      <span class="right-arrow"></span>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'pagination',
  props: {
    current: {
      type: Number,
      required: true,
    },
    limit: {
      type: Number,
      default: 10,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      page: this.current,
      totalPages: Math.ceil(this.total / this.limit),
    };
  },
  computed: {
    atBeginning() {
      return this.current === 0;
    },
    atEnd() {
      return this.current === (this.totalPages - 1);
    },
    pages() {
      const pages = [this.current];
      const nextPage = this.current + 1;
      const prev = this.current - 1;

      if (prev >= 0 && prev !== this.current) {
        pages.push(prev);
      }

      if (nextPage < this.totalPages && nextPage !== this.current) {
        pages.push(nextPage);
      }

      return pages.sort((a, b) => a - b);
    },
  },
  methods: {
    previous() {
      if (!this.atBeginning) {
        this.$emit('previous');
      }
    },
    next() {
      if (!this.atEnd) {
        this.$emit('next');
      }
    },
  },
};
</script>

<style lang="scss">
  .p-box {
    border: 1px solid black;
    cursor: pointer;
    display: inline-block;
    height: 36px;
    margin-left: 4px;
    margin-right: 4px;
    position: relative;
    transition-delay: 120ms;
    transition-duration: 500ms;
    transition-property: border-color color;
    transition-timing-function: ease-in-out;
    width: 36px;

    &.inactive {
      border: 1px solid #c8c8c8;
      cursor: inherit;

      .left-arrow {
        border-bottom: 1px solid #c8c8c8;
        border-left: 1px solid #c8c8c8;
      }

      .right-arrow {
        border-right: 1px solid #c8c8c8;
        border-top: 1px solid #c8c8c8;
      }
    }

    &.active {
      background-color: #CE9833;
      border: 1px solid #CE9833;
      color: white;
    }

    &:hover:not(.active) {
      border: 1px solid #CE9833;
      color: #CE9833;

      .left-arrow {
        border-bottom: 1px solid #CE9833;
        border-left: 1px solid #CE9833;
      }

      .right-arrow {
        border-right: 1px solid #CE9833;
        border-top: 1px solid #CE9833;
      }
    }

    .left-arrow {
      border-bottom: 1px solid black;
      border-left: 1px solid black;
      display: block;
      height: 12px;
      margin-left: 14px;
      margin-top: 10px;
      transform: rotate(45deg);
      transition-delay: 120ms;
      transition-duration: 200ms;
      transition-property: border-color;
      transition-timing-function: ease-in-out;
      width: 12px;
    }

    .number {
      display: block;
      position: absolute;
      font-size: 12px;
      left: 0;
      right: 0;
      margin: 8px auto;
      text-align: center;
      width: 12px;
    }

    .right-arrow {
      border-right: 1px solid black;
      border-top: 1px solid black;
      display: block;
      height: 12px;
      margin-left: 8px;
      margin-top: 10px;
      transform: rotate(45deg);
      transition-delay: 120ms;
      transition-duration: 500ms;
      transition-property: border-color;
      transition-timing-function: ease-in-out;
      width: 12px;
    }
  }
</style>
