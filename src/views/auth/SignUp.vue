<template>
  <div class="flex flex-wrap h-screen">
    <our-alert :alert-type="info.type" :display="displayInfo">
      <p class="font-bold">{{info.header}}</p>
      <p class="text-sm">{{info.details}}</p>
    </our-alert>

    <!-- Left Side -->
    <div class="w-1/3 bg-gray-100 bg-overlay relative">
      <router-link :to="{ name: 'home' }"><img class="h-16 my-6 mx-12 absolute" src="@/assets/img/logo-b.svg"/></router-link>
      <div class="flex flex-col justify-center h-full px-12">
        <span class="text-primary text-4xl mb-6" v-if="page === 0">
          Get live data on the performance and activities of cuttent African Leaders.
        </span>
        <span class="text-primary text-4xl mb-6" v-if="page === 1">
          Now, you can join the league of responsible citizens to hold your leaders accountable.
        </span>
        <hr class="bg-primary h-px w-20"/>
      </div>
    </div>

    <!-- Right Side -->
    <div class="w-2/3 flex flex-wrap flex-col justify-center">
      <transition name="fade">
        <div id="container">
          <div class="mx-auto w-6/12" v-if="page === 0">
            <span class="block text-5xl mb-10">Sign Up</span>
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
                      src="../../assets/img/password-eye.svg"
                      @click="togglePassword"/>
                  </div>
                </div>
              </div>
              <div class="w-full mb-6">
                <our-checkbox left
                  :model="data.subscribe"
                  v-on:change="data.subscribe = $event"
                  label="I would like to subscribe to the montly news letter."></our-checkbox>
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
            <our-social-login isSignUp @successful="persistSocialLogin" @error="showInfo"></our-social-login>
            <p>
              Have an account already?
              <router-link to="/auth/sign-in">
                <a class="cursor-pointer text-primary font-semibold">log in</a>
              </router-link>
            </p>
          </div>

          <!-- Welcome Page -->
          <div class="mx-auto w-6/12" v-if="page === 1">
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
      </transition>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'SignUp',
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
      displayInfo: false,
      displayPassword: false,
      info: {
        header: null,
        details: null,
        type: 'info',
      },
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
    placeholder() {
      return '&#183;&#183;&#183;';
    },
  },
  methods: {
    async generateVerificationCode() {
      try {
        if (this.isValidPhoneNumber()) {
          this.sending = true;
          await this.authServices.sendVerificationCode(this.data.phone);
          this.showInfo('Success', 'Verification code was successfully sent.', 'success');
          this.sending = false;
          this.codeSent = true;
        } else {
          this.sending = false;
          this.showInfo('Uh Oh', 'Invalid phone number, code was not sent.', 'error');
        }
      } catch (err) {
        this.sending = false;
        this.showInfo('Uh Oh', 'An error occured while sending you a pin.', 'error');
      }
    },
    async signUp() {
      try {
        this.loading = true;
        this.hasError = false;
        const response = await this.authServices.signUp(this.data);

        this.$store.commit('setCurrentUser', response.data.user);
        this.$store.commit('setJWT', response.data.token);
        this.showInfo('Success', 'Welcome! We are glad to have you join us.', 'success');
        this.page = 1;
      } catch (err) {
        this.loading = false;
        this.showInfo('Uh Oh', err.response.data.message, 'error');
      }
    },
    async verify() {
      try {
        this.loading = true;
        const response = await this.authServices.verifyNumber({
          verificationCode: this.data.verificationCode,
        });

        this.showInfo('Success', 'Phone number verified.', 'success');
        this.$store.commit('setCurrentUser', response.data.user);
        this.$router.push('/');
      } catch (err) {
        this.showInfo('Uh Oh', 'Phone number not verified.', 'error');
      }
    },
    editNumber() {
      this.codeSent = false;
    },
    persistSocialLogin(data) {
      this.data = data;
      this.signUp();
    },
    proceed() {
      if (this.page === 0) {
        this.signUp();
      } else {
        this.verify();
      }
    },
    showInfo(header, msg, type) {
      this.info.header = header;
      this.info.details = msg;
      this.info.type = type;
      this.displayInfo = true;
      setTimeout(() => { this.displayInfo = false; }, 3000);
    },
    togglePassword() {
      this.displayPassword = !this.displayPassword;
    },
    isValidPhoneNumber() {
      const pattern = /^\d+$/;
      let valid = true;

      if (this.data.phone && this.data.phone.length === 10) {
        valid = this.data.phone.charAt(0) !== '0';
      }

      return pattern.test(this.data.phone) && [10, 11].includes(this.data.phone.length) && valid;
    },
  },
};
</script>

<style lang="scss">
</style>
