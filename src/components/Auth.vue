<template>
  <div>
    <!-- Sign Up -->
    <div class="flex flex-wrap flex-col justify-center" v-if="!isLogIn">
      <div id="container">
        <div class="mx-auto w-full" v-if="page === 0">
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
                    src="@/assets/img/password-eye.svg"
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
                'loading': loading,
              }"
              :disabled="loading">
              Sign Up
            </button>
          </form>
          <div class="w-full mb-8 horizontal-divide">
            <span>OR</span>
          </div>
          <our-social-login isSignUp @successful="persistSocialLogin" @error="showSocialError"></our-social-login>
          <p>
            Have an account already?
            <span class="cursor-pointer text-primary font-semibold" @click="togglePage">log in</span>
          </p>
        </div>

        <!-- Welcome Page -->
        <div class="w-full" v-if="page === 1">
          <span class="block text-5xl mb-4">Welcome!</span>
          <p class="mb-10">
            Hello CreativeChimdi, we're glad to have you.
            <br/>
            Because we want to keep fake accounts off our platform,
            <br/>
            we'll need to verify your phone number.
          </p>
          <form @submit.prevent="proceed">
            <div class="mb-6">
              <label class="block" for="phone">
                <span class="font-semibold">Phone number</span>
              </label>
              <div class="input-fields">
                <span class="inline-block w-1/12">
                  +234
                </span>
                <input class="w-9/12 py-2 mb-1 pl-2"
                  @blur="generateVerificationCode"
                  type="tel"
                  id="phone"
                  name="phone"
                  v-model="data.phone"
                  :disabled="sending || codeSent"
                  ref="phone"
                  placeholder="Enter your number here"
                  required>
                <div class="w-2/12 inline-block" v-if="sending">
                  <span class="loading float-right"></span>
                </div>
                <button class="w-2/12 border-2 border-gray-600 cursor-pointer"
                  v-if="codeSent"
                  @click="editNumber">
                  Edit
                </button>
              </div>
            </div>
            <div class="mb-6">
              <label :class="{
                'block font-semibold': true,
                'text-gray-300': !codeSent
                }" for="verification">
                Verification pin
                <span
                  class="block cursor-pointer font-regular text-xs
                  text-gray-500 float-right align-middle"
                  @click="generateVerificationCode">
                  Didn't receive a pin? Click to resend
                </span>
              </label>
              <input class="verification field w-full py-2"
                type="text"
                id="verification"
                name="verification"
                placeholder="••••"
                v-model="data.verificationCode"
                :maxlength="4"
                :disabled="!codeSent"
                required/>
            </div>
            <button
              :class="{
                'btn-primary w-full mb-8': true,
                'loading': loading,
              }"
              :disabled="loading || !codeSent">
              Verify
            </button>
          </form>
        </div>
      </div>
    </div>

    <!-- Sign In -->
    <div class="flex flex-col justify-center" v-if="isLogIn">
      <div class="mt-20 lg:mt-0 xl:mt-0 w-full">
        <form @submit.prevent="signIn">
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
              <span
                class="block cursor-pointer font-regular text-sm
                text-gray-500 float-right align-middle">
                Forgot Password?
              </span>
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
                  src="@/assets/img/password-eye.svg"
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
        <our-social-login @successful="persistSocialLogin" @error="showSocialError"></our-social-login>
        <p>
          Don't have an account?
          <span class="cursor-pointer text-primary font-semibold" @click="togglePage">sign up</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'auth',
  data() {
    return {
      authServices: this.$serviceFactory.auth,
      codeSent: false,
      data: {
        email: null,
        password: null,
        phone: null,
        verificationCode: null,
        subscribe: true,
      },
      displayPassword: false,
      isSignUp: false,
      loading: false,
      page: 0,
      sending: false,
    };
  },
  created() {
    if (this.$route.query && this.$route.query.signedIn === 'true') {
      this.data.phone = this.user && this.user.phoneNumber ? this.user.phoneNumber : null;
      this.page = 1;
      setTimeout(() => this.$refs.phone.focus(), 1000);
    }
  },
  computed: {
    ...mapGetters([
      'user',
    ]),
    isLogIn() {
      return !this.isSignUp;
    },
    placeholder() {
      return '&#183;&#183;&#183;';
    },
  },
  methods: {
    ...mapActions([
      'displayError',
      'displaySuccess',
    ]),
    async generateVerificationCode() {
      try {
        if (this.isValidPhoneNumber()) {
          this.sending = true;
          await this.authServices.sendVerificationCode(this.data.phone);
          this.$emit('successful', 'erification code was successfully sent.');
          this.sending = false;
          this.codeSent = true;
        } else {
          this.sending = false;
          this.displayError({
            message: 'Invalid phone number, code was not sent.',
          });
        }
      } catch (err) {
        this.sending = false;
        this.displayError({
          message: 'An error occured while sending you a pin.',
        });
      }
    },
    async signIn() {
      try {
        this.loading = true;
        this.hasError = false;
        const response = await this.authServices.login(this.data);

        this.displaySuccess({
          message: 'Welcome back! Find everything just as you left it.',
        });
        this.$store.commit('setCurrentUser', response.data.user);
        this.$store.commit('setJWT', response.data.token);

        if (!response.data.user.isPhoneVerified) {
          this.page = 1;
          this.isSignUp = true;
          this.loading = false;
        } else {
          this.closeModal();
        }
      } catch (err) {
        this.loading = false;
        this.displayError({
          message: 'Email or password is incorrect.',
        });
      }
    },
    async signUp() {
      try {
        this.loading = true;
        this.hasError = false;
        const response = await this.authServices.signUp(this.data);

        this.$store.commit('setCurrentUser', response.data.user);
        this.$store.commit('setJWT', response.data.token);
        this.displaySuccess({
          message: 'Welcome! We are glad to have you join us.',
        });
        this.loading = false;
        this.page = 1;
      } catch (err) {
        this.loading = false;
        this.displayError({
          message: err.response.data.message,
        });
      }
    },
    async verify() {
      try {
        this.loading = true;
        const response = await this.authServices.verifyNumber({
          verificationCode: this.data.verificationCode,
        });

        this.displaySuccess({
          message: 'Phone number verified.',
        });
        this.loading = false;
        this.$store.commit('setCurrentUser', response.data.user);
        this.closeModal();
      } catch (err) {
        this.loading = false;
        this.displayError({
          message: 'Phone number not verified.',
        });
      }
    },
    closeModal() {
      this.$store.commit('hideSignUp');
    },
    editNumber() {
      this.codeSent = false;
    },
    isValidPhoneNumber() {
      const pattern = /^\d+$/;
      let valid = true;

      if (this.data.phone && this.data.phone.length === 10) {
        valid = this.data.phone.charAt(0) !== '0';
      }

      return pattern.test(this.data.phone) && [10, 11].includes(this.data.phone.length) && valid;
    },
    persistSocialLogin(data) {
      this.data = data;
      if (this.isSignUp) {
        this.signUp();
      } else {
        this.signIn();
      }
    },
    proceed() {
      if (this.page === 0) {
        this.signUp();
      } else {
        this.verify();
      }
    },
    showSocialError(msg) {
      this.displayError({
        message: msg,
      });
    },
    togglePage() {
      this.isSignUp = !this.isSignUp;
      this.$emit('toggle', this.isSignUp ? 'signup' : 'login');
    },
    togglePassword() {
      this.displayPassword = !this.displayPassword;
    },
  },
};
</script>

<style lang="scss">
</style>
