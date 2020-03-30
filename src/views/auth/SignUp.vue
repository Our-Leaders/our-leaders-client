<template>
  <auth-layout :isPrimary="false">
    <template v-slot:left-caption>
      <span class="text-primary text-xl md:text-2xl lg:text-4xl mb-6 text-center lg:text-left" v-if="page === 0">
        Get live data on the performance and activities of cuttent African Leaders.
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
      <div v-if="page === 0">
        <our-sign-up-form :goToVerify="() => goToPage(1)" :goToSignIn="goToSignIn"/>
      </div>
      <div v-if="page === 1">
        <!-- Welcome Page -->
        <our-verify-form/>
      </div>
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
  },
};
</script>

<style lang="scss">
</style>
