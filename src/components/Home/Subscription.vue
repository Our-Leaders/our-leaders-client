<template>
<div class="subscription block relative">
  <p class="subscribe-text mb-4"><span class="text-primary">Subscribe</span> to our newsletter</p>
  <p class="font-circular">Be the first to get updates on your favorite leaders.</p>
  <form class="relative w-full subscribe-form">
    <input class="subscribe-input" type="text" v-model="email"/>
    <button class="bg-primary border border-primary py-2 px-12 outline-none text-white h-full" type="submit" @click="subscribe" :disabled="!email">Subscribe</button>
  </form>
</div>
</template>

<script>
export default {
  name: 'subscription',
  data() {
    return {
      email: '',
    };
  },
  methods: {
    subscribe() {
      console.log('subscribed: ', this.email);
    },
  },
};
</script>

<style lang="scss" scoped>
  .subscribe-text {
    font-size: 3.75rem;
  }

  .subscribe-form {
    margin-top: 3.75rem;
    height: 3rem;

    .subscribe-input {
      @apply bg-gray-fa border-b border-gray-c4 outline-none;
      width: 44rem;
      height: calc(100% + 1px);
      width: 32.75rem;
      padding: 0 0.725rem;
    }
  }
</style>
