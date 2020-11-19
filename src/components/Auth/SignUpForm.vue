<template>
  <div>
    <form @submit.prevent="signUp">
      <div class="mb-6">
        <label class="block font-semibold" for="email">Email</label>
        <input class="field w-full py-2"
          type="text"
          id="email"
          name="email"
          v-model="data.email"
          placeholder="Enter email"
          required/>
      </div>
      <div class="mb-6">
        <label class="block" for="password">
          <span class="font-semibold">Password</span>
        </label>
        <div class="input-fields">
          <input class="field w-11/12 py-2"
            :type="!displayPassword ? 'password' : 'text'"
            id="password"
            name="password"
            v-model="data.password"
            placeholder="Enter password"
            required>
          <div class="inline-block w-1/12 text-right pr-2">
            <img class="inline-block cursor-pointer"
              src="../../assets/img/password-eye.svg"
              @click="togglePassword"/>
          </div>
        </div>
      </div>
      <div class="w-full mb-6">
        <our-checkbox left
          :model="data.subscribe"
          v-on:change="data.subscribe = $event"
          label="I would like to subscribe to the monthly newsletter."></our-checkbox>
      </div>
      <button
        :class="{
          'btn-primary w-full mb-8': true,
          'btn-loading': loading,
        }"
        :disabled="loading">
        Sign Up
      </button>
    </form>
    <div class="w-full mb-8 horizontal-divide">
      <span>OR</span>
    </div>
    <our-social-login isSignUp @successful="persistSocialLogin" @error="showError"></our-social-login>
    <p class="mb-12">
      Have an account already?
      <a @click="goToSignIn" class="cursor-pointer text-primary font-semibold">log in</a>
    </p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'our-sign-up-form',
  props: {
    goToSignIn: {
      type: Function,
      required: true,
    },
    goToHome: {
      type: Function,
      required: true,
    },
    goToVerify: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      authServices: this.$serviceFactory.auth,
      data: {
        subscribe: true,
      },
      displayPassword: false,
      loading: false,
      hasError: false,
    };
  },
  computed: {
    ...mapGetters([
      'user',
    ]),
  },
  methods: {
    ...mapActions([
      'displayError',
      'displaySuccess',
    ]),
    async signUp() {
      try {
        this.loading = true;
        this.hasError = false;
        if (this.data.email) {
          this.data.email = this.data.email.toLowerCase().trim();
        }

        const response = await this.authServices.signUp(this.data);

        this.$store.commit('setCurrentUser', response.data.user);
        this.$store.commit('setJWT', response.data.token);
        this.showSuccess('Welcome! We are glad to have you join us.');
        if (response.data.user.isEmailVerified) {
          this.goToHome();
        } else {
          this.goToVerify();
        }
      } catch (err) {
        this.loading = false;
        this.showError(err.response.data.message);
      }
    },
    persistSocialLogin(data) {
      this.data = data;
      this.signUp();
    },
    showError(message) {
      this.displayError(message);
    },
    showSuccess(message) {
      this.displaySuccess({ message });
    },
    togglePassword() {
      this.displayPassword = !this.displayPassword;
    },
  },
};
</script>

<style lang="scss">
</style>
