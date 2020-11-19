<template>
  <auth-layout :isPrimary="false">
    <template v-slot:left-caption>
      <span class="text-primary text-xl md:text-2xl lg:text-4xl mb-6 text-center lg:text-left" v-if="page === 0">
        Monitor the progress and performance of political leaders across Africa.
      </span>
      <span class="text-primary text-xl md:text-2xl lg:text-4xl mb-6 text-center lg:text-left" v-if="page === 1">
        Now, you can join the league of responsible citizens to hold your leaders accountable.
      </span>
      <hr class="mx-auto mb-2 lg:mx-0 lg:mb-0 bg-primary h-px w-20"/>
    </template>
    <template v-slot:header>
      <span v-if="page === 0">Sign Up</span>
      <span v-if="page === 1">Welcome!</span>
    </template>
    <template v-slot:body>
      <our-sign-up-form v-if="page === 0" :goToVerify="() => goToPage(1)" :goToSignIn="goToSignIn" :goToHome="goToHome"/>
      <!-- Welcome Page -->
      <our-verify-form v-if="page === 1" :goToHome="goToHome"/>
    </template>
  </auth-layout>
</template>

<script>
export default {
  name: 'SignUp',
  data() {
    return {
      page: 0,
    };
  },
  created() {
    if (this.$route.query && this.$route.query.signedIn === 'true') {
      this.goToPage(1);
    }
  },
  methods: {
    goToPage(page) {
      this.page = page;
    },
    goToSignIn() {
      this.$router.push('/auth/sign-in');
    },
    goToHome() {
      this.$router.push('/');
    },
  },
};
</script>

<style lang="scss">
</style>
