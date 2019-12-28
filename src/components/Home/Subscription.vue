<template>
<div class="subscription block relative">
  <p class="subscribe-text mb-4"><span class="text-primary">Subscribe</span> to our newsletter</p>
  <small class="text-xs">Be the first to get updates on your favorite leaders.</small>
  <div class="relative w-full h-20 md:h-32 lg:h-40">
    <input type="text" v-model="email"/>
    <button type="submit" @click="subscribe" :disabled="!email">Subscribe</button>
  </div>
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
</style>
