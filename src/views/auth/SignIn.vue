<template>
  <div class="flex flex-wrap h-1/2 lg:h-screen xl:h-screen">
    <our-alert :alert-type="info.type" :display="displayInfo">
      <p class="font-bold">{{info.header}}</p>
      <p class="text-sm">{{info.details}}</p>
    </our-alert>
    <div class="w-full lg:w-1/3 xl:w-1/3 bg-primary bg-overlay relative">
      <router-link :to="{ name: 'home' }"><img class="h-16 my-6 mx-auto lg:mx-12 xl:mx-12 relative lg:absolute xl:absolute" src="@/assets/img/logo-w.svg"/></router-link>
      <div class="flex flex-col justify-center lg:h-full xl:h-full px-12">
        <span class="text-white text-xl md:text-2xl lg:text-4xl xl:text-4xl mb-6 text-center lg:text-left xl:text-left">
          Get live data on the performance and activities of cuttent African Leaders.
        </span>
        <hr class="mx-auto mb-2 lg:mx-0 lg:mb-0 xl:mx-0 xl:mb-0 text-white w-20"/>
      </div>
    </div>

    <!-- Right Side -->
    <div class="w-full lg:w-2/3 xl:w-2/3 flex flex-col justify-center">
      <div class="mt-20 lg:mt-0 xl:mt-0 mx-auto w-10/12 lg:w-6/12 xl:w-6/12">
        <span class="block text-5xl mb-10">Log in</span>
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
        <our-social-login @successful="persistSocialLogin" @error="showInfo"></our-social-login>
        <p>
          Don't have an account?
          <router-link to="/auth/sign-up">
            <a class="cursor-pointer text-primary font-semibold">sign up</a>
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignIn',
  data() {
    return {
      authServices: this.$serviceFactory.auth,
      data: {
        email: null,
        password: null,
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
  methods: {
    async proceed() {
      try {
        this.loading = true;
        this.hasError = false;
        const response = await this.authServices.login(this.data);

        this.showInfo('Success', 'Welcome back! Find everything just as you left it.', 'success');
        this.$store.commit('setCurrentUser', response.data.user);
        this.$store.commit('setJWT', response.data.token);

        if (response.data.user.isPhoneVerified) {
          this.$router.push('/');
        } else {
          this.$router.push('/auth/sign-up?signedIn=true');
        }
      } catch (err) {
        this.loading = false;
        this.showInfo('Uh Oh', 'Email or password is incorrect.', 'error');
      }
    },
    persistSocialLogin(data) {
      this.data = data;
      this.proceed();
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
  },
};
</script>

<style lang="scss">
</style>
