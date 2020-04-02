<template>
  <div>
    <!-- Sign Up -->
    <div class="flex flex-wrap flex-col justify-center" v-if="isSignUp">
      <div id="container">
        <div class="mx-auto w-full" v-if="page === 0">
          <our-sign-up-form :goToVerify="goToVerify" :goToSignIn="togglePage"/>
        </div>
        <!-- Welcome Page -->
        <div class="mx-auto w-full" v-if="page === 1">
          <span class="block text-4xl mb-4">Welcome!</span>
          <our-verify-form :goToHome="closeModal" />
        </div>
      </div>
    </div>

    <!-- Sign In -->
    <div class="flex flex-col justify-center" v-if="!isSignUp">
      <div class="mt-20 lg:mt-0 xl:mt-0 w-full" v-if="page === 0">
        <our-sign-in-form
          :goToForgotPassword="() => goToPage(1)"
          :goToSignUp="togglePage"
          :goToHome="closeModal"
          :goToVerify="goToVerify"
        />
      </div>
      <div class="mt-20 lg:mt-0 xl:mt-0 w-full" v-if="page === 1">
        <span class="block text-4xl mb-4">Forgot your password?</span>
        <our-forgot-password-form :goToSignIn="() => goToPage(0)"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'auth',
  data() {
    return {
      isSignUp: false,
      page: 0,
    };
  },
  created() {
    if (this.$route.query && this.$route.query.signedIn === 'true') {
      this.goToPage(1);
    }
  },
  methods: {
    ...mapActions([
      'displayError',
      'displaySuccess',
    ]),
    closeModal() {
      this.$store.commit('hideSignUp');
    },
    togglePage() {
      this.isSignUp = !this.isSignUp;
      this.$emit('toggle', this.isSignUp ? 'signup' : 'login');
    },
    goToPage(page) {
      this.page = page;
    },
    goToVerify() {
      this.goToPage(1);
      if (!this.isSignUp) {
        this.togglePage();
      }
    },
  },
};
</script>

<style lang="scss">
</style>
