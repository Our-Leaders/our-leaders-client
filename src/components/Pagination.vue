<template>
  <ul>
    <li
      :class="{
        'p-box': true,
        'inactive': atBeginning
      }"
      @click="goBack">
      <span class="left-arrow"></span>
    </li>
    <li :class="{
      'p-box': true,
      'active': page == i
      }"
      v-for="(item, i) in number"
      :key="i"
      @click="$emit('change', i)">
      <span :class="{
        'number font-semibold': true,
        'active': page == i
        }">
        {{item}}
      </span>
    </li>
    <li class="p-box"
      @click="$emit('next')">
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
  },
  data() {
    return {
      page: this.current,
      number: [1, 2, 3, 4, 5],
    };
  },
  computed: {
    atBeginning() {
      return this.current === 0;
    },
  },
  methods: {
    goBack() {
      if (!this.atBeginning) {
        this.$emit('previous');
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
    width: 36px;

    &.inactive {
      border: 1px solid #c8c8c8;
      cursor: inherit;
    }

    &.active {
      background-color: #CE9833;
      border: 1px solid #CE9833;
      color: white;
    }

    .left-arrow {
      border-bottom: 1px solid black;
      border-left: 1px solid black;
      display: block;
      height: 12px;
      margin-left: 14px;
      margin-top: 10px;
      transform: rotate(45deg);
      width: 12px;

      &.inactive {
        border-bottom: 1px solid #c8c8c8;
        border-left: 1px solid #c8c8c8;
      }
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
      width: 12px;

      &.inactive {
        border-bottom: 1px solid #c8c8c8;
        border-left: 1px solid #c8c8c8;
      }
    }
  }
</style>
