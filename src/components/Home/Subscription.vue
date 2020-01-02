<template>
<div class="subscription block relative">
  <p class="subscribe-text mb-4"><span class="text-primary">Subscribe</span> to our newsletter</p>
  <p class="font-circular hidden md:block">Be the first to get updates on your favorite leaders.</p>
  <form class="relative w-full subscribe-form px-6">
    <input class="subscribe-input placeholder-gray-96 md:placeholder-transparent font-circular" placeholder="Enter email" type="text" v-model="email"/>
    <button class="bg-primary border border-primary py-2 px-12 outline-none text-white h-full w-full md:w-auto" type="submit" @click="subscribe" :disabled="!email">Subscribe</button>
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
    font-size: 3rem;
    line-height: 3.875rem;

    @screen lg {
      font-size: 3.75rem;
    }
  }

  .subscribe-form {
    margin-top: 3.75rem;
    height: 3rem;

    .subscribe-input {
      @apply border-b border-gray-c4 outline-none;
      width: 44rem;
      height: 100%;
      margin-bottom: 1rem;
      padding: 0 0.725rem;
      width: 100%;

      @screen md {
        @apply bg-gray-fa;
        width: 32.75rem;
      }
    }
  }
</style>
