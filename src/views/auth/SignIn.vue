<template>
  <auth-layout>
    <template v-slot:left-caption>
      <span class="text-white text-xl md:text-2xl lg:text-4xl xl:text-4xl mb-6 text-center lg:text-left xl:text-left">
        Get live data on the performance and activities of cuttent African Leaders.
      </span>
      <hr class="mx-auto mb-2 lg:mx-0 lg:mb-0 xl:mx-0 xl:mb-0 text-white w-20"/>
    </template>
    <template v-slot:header>
      <span v-if="page === 0">Log in</span>
      <span v-if="page === 1">Forgot your password?</span>
    </template>
    <template v-slot:body>
      <div v-if="page === 0">
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
                @click="goToPage(1)">
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
          <router-link to="/auth/sign-up">
            <a class="cursor-pointer text-primary font-semibold">sign up</a>
          </router-link>
        </p>
      </div>
      <div v-if="page === 1">
        <form @submit.prevent="requestPasswordReset">
          <div class="mb-6">
            <label class="block font-semibold mb-4" for="email">Enter the email associated with your account and we'll send you a reset link.</label>
            <input class="field w-full py-2"
              type="text"
              id="email"
              name="email"
              v-model="resetEmail"
              placeholder="Enter email"
              required/>
          </div>
          <button
            :class="{
              'btn-primary w-full mb-8': true,
              'loading': loading,
            }"
            :disabled="loading || !resetEmail">
            Send Reset Link
          </button>
        </form>
        <p>
          I remember my password!
          <a class="cursor-pointer text-primary font-semibold" @click="goToPage(0)">log me in</a>
        </p>
      </div>
    </template>
  </auth-layout>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'SignIn',
  data() {
    return {
      authServices: this.$serviceFactory.auth,
      data: {
        email: null,
        password: null,
      },
      resetEmail: null,
      displayPassword: false,
      loading: false,
      page: 0,
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
        this.hasError = false;
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
    async requestPasswordReset() {
      try {
        this.loading = true;
        await this.authServices.requestPasswordReset({
          email: this.resetEmail,
        });

        this.showSuccess('Please check the email associated with your account for further instructions. If you do not receive this email, please contact admin.');

        this.loading = false;
      } catch (err) {
        this.loading = false;
        this.showError(err);
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
    goToPage(page) {
      this.page = page;
    },
  },
};
</script>

<style lang="scss">
</style>
