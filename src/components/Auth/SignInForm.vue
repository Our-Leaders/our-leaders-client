<template>
  <div>
    <form @submit.prevent="proceed">
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
          <a
            class="block cursor-pointer font-regular text-sm
            text-gray-500 float-right align-middle"
            @click="goToForgotPassword">
            Forgot Password?
          </a>
        </label>
        <div class="input-fields">
          <input class="w-11/12 py-2"
            :type="!displayPassword ? 'password' : 'text'"
            id="password"
            name="password"
            v-model="data.password"
            placeholder="Enter password"
            required>
          <div class="inline-block w-1/12">
            <img class="inline-block cursor-pointer"
              src="../../assets/img/password-eye.svg"
              @click="togglePassword"/>
          </div>
        </div>
      </div>
      <button
        :class="{
          'btn-primary w-full mb-8': true,
          'loading': loading,
        }"
        :disabled="loading">
        Log In
      </button>
    </form>
    <div class="w-full mb-8 horizontal-divide">
      <span>OR</span>
    </div>
    <our-social-login @successful="persistSocialLogin" @error="showError"></our-social-login>
    <p>
      Don't have an account?
      <a @click="goToSignUpForm" class="cursor-pointer text-primary font-semibold">sign up</a>
    </p>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'our-sign-in-form',
  props: {
    goToForgotPassword: {
      type: Function,
      required: true,
    },
    goToSignUpForm: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      authServices: this.$serviceFactory.auth,
      data: {
        email: null,
        password: null,
      },
      displayPassword: false,
      loading: false,
    };
  },
  methods: {
    ...mapActions([
      'displayError',
      'displaySuccess',
    ]),
    async proceed() {
      try {
        this.loading = true;
        const response = await this.authServices.login(this.data);

        this.showSuccess('Welcome back! Find everything just as you left it.');
        this.$store.commit('setCurrentUser', response.data.user);
        this.$store.commit('setJWT', response.data.token);

        if (response.data.user.isPhoneVerified) {
          this.$router.push('/');
        } else {
          this.$router.push('/auth/sign-up?signedIn=true');
        }
      } catch (err) {
        this.loading = false;
        this.showError('Email or password is incorrect.');
      }
    },
    persistSocialLogin(data) {
      this.data = data;
      this.proceed();
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
