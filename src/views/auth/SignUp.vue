<template>
  <div class="flex flex-wrap h-full">
    <our-alert :alert-type="info.type" :display="displayInfo">
      <p class="font-bold">{{info.header}}</p>
      <p class="text-sm">{{info.details}}</p>
    </our-alert>

    <!-- Left Side -->
    <div class="w-1/3 bg-gray-100 bg-overlay relative">
      <img class="h-16 my-6 mx-12 absolute" src="../../assets/img/logo-b.svg"/>
      <div class="flex flex-col justify-center h-full px-12">
        <span class="text-primary text-4xl mb-6">
          Get live data on the performance and activities of cuttent African Leaders.
        </span>
        <hr class="bg-primary h-px w-20"/>
      </div>
    </div>

    <!-- Right Side -->
    <div class="w-2/3 flex flex-wrap flex-col justify-center">
      <div class="mx-auto w-6/12" v-if="false">
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
        <button
          :class="{
            'bg-transparent border-2 border-gray-300 w-full p-2 mb-2': true,
            'loading': loading,
          }"
          :disabled="loading"
          type="button">
          <img class="h-6 float-left text-black inline-block"
            src="../../assets/img/facebook_gray.svg"/>
          Sign up with Facebook
        </button>
        <button
          :class="{
            'bg-transparent border-2 border-gray-300 w-full p-2 mb-8': true,
            'loading': loading,
          }"
          :disabled="loading"
          type="button">
          <img class="h-6 float-left text-black inline-block"
            src="../../assets/img/google_gray.svg"/>
          Sign up with Google
        </button>
        <p>
          Have an account already?
          <router-link to="/auth/sign-in">
            <a class="cursor-pointer text-primary font-semibold">log in</a>
          </router-link>
        </p>
      </div>

      <!-- Welcome Page -->
      <div class="mx-auto w-6/12" v-if="true">
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
              <div class="inline-block w-1/12">
                +234
              </div>
              <input class="w-11/12 py-2 pl-2"
                type="tel"
                id="phone"
                name="phone"
                v-model="data.phone"
                placeholder="Enter your number here"
                required>
            </div>
          </div>
          <div class="mb-6">
            <label class="block text-gray-300 font-semibold" for="email">
              Verification pin
              <span
                class="block cursor-pointer font-regular text-xs
                text-gray-500 float-right align-middle">
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
              required/>
          </div>
          <button
            :class="{
              'btn-primary w-full mb-8': true,
              'loading': loading,
            }"
            :disabled="loading">
            Verify
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignUp',
  data() {
    return {
      authServices: this.$serviceFactory.auth,
      data: {
        email: null,
        password: null,
        phone: null,
        verificationCode: null,
      },
      displayInfo: false,
      displayPassword: false,
      info: {
        header: null,
        details: null,
        type: 'info',
      },
      loading: false,
    };
  },
  computed: {
    placeholder() {
      return '&#183;&#183;&#183;';
    },
  },
  methods: {
    async proceed() {
      try {
        this.loading = true;
        this.hasError = false;
        const response = await this.authServices.login(this.data);

        this.$store.commit('setCurrentUser', response.data.user);
        this.$store.commit('setJWT', response.data.token);
        this.showInfo('Success', 'Welcome back! Find everything just as you left it.', 'success');
      } catch (err) {
        this.showInfo('Uh Oh', 'Email or password is incorrect.', 'error');
      }
    },
    showInfo(header, msg, type) {
      this.info.header = header;
      this.info.details = msg;
      this.info.type = type;
      this.displayInfo = true;
    },
    togglePassword() {
      this.displayPassword = !this.displayPassword;
    },
  },
};
</script>

<style lang="scss">
  .bg-overlay {
    background-image: url('../../assets/img/auth-bg-pattern.svg');
    background-size: cover;
  }

  .verification {
    letter-spacing: 1em;
  }

  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
</style>
