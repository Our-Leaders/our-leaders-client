<template>
  <auth-layout>
    <template v-slot:left-caption>
      <span class="text-white text-xl md:text-2xl lg:text-4xl xl:text-4xl mb-6 text-center lg:text-left xl:text-left">
        Monitor the progress and performance of political leaders across Africa.
      </span>
      <hr class="mx-auto mb-2 lg:mx-0 lg:mb-0 xl:mx-0 xl:mb-0 text-white w-20"/>
    </template>
    <template v-slot:header>
      <span v-if="page === 0">Log in</span>
      <span v-if="page === 1">Forgot your password?</span>
    </template>
    <template v-slot:body>
      <our-sign-in-form
        v-if="page === 0"
        :goToForgotPassword="() => goToPage(1)"
        :goToSignUp="goToSignUp"
        :goToHome="goToHome"
        :goToVerify="goToVerify"
      />
      <our-forgot-password-form v-if="page === 1" :goToSignIn="() => goToPage(0)"/>
    </template>
  </auth-layout>
</template>

<script>
export default {
  name: 'SignIn',
  data() {
    return {
      page: 0,
    };
  },
  methods: {
    goToPage(page) {
      this.page = page;
    },
    goToSignUp() {
      this.$router.push('/auth/sign-up');
    },
    goToHome() {
      this.$router.push('/');
    },
    goToVerify() {
      this.$router.push('/auth/sign-up?signedIn=true');
    },
  },
};
</script>

<style lang="scss">
</style>
