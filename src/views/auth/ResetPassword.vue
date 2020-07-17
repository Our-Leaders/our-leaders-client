<template>
  <auth-layout>
    <template v-slot:left-caption>
      <span class="text-white text-xl md:text-2xl lg:text-4xl xl:text-4xl mb-6 text-center lg:text-left xl:text-left">
        Get live data on the performance and activities of current African Leaders.
      </span>
      <hr class="mx-auto mb-2 lg:mx-0 lg:mb-0 xl:mx-0 xl:mb-0 text-white w-20"/>
    </template>
    <template v-slot:header>
      <span>Change Password</span>
    </template>
    <template v-slot:body>
      <our-password-reset-form :goToSignIn="goToSignIn"/>
    </template>
  </auth-layout>
</template>

<script>
export default {
  name: 'ResetPassword',
  methods: {
    goToSignIn() {
      this.$router.push('/auth/sign-in');
    },
  },
};
</script>

<style lang="scss">
</style>
