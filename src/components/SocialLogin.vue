<template>
  <div>
    <button
      :class="{
        'bg-transparent border-2 border-gray-300 w-full p-2 mb-2': true,
        'btn-loading': loading.facebook,
      }"
      :disabled="loading.google || loading.facebook"
      @click="authenticate('facebook')"
      type="button">
      <img class="h-6 float-left text-black inline-block"
        src="@/assets/img/facebook-gray.svg"/>
      {{isSignUp ? 'Sign up with Facebook' : 'Log in with Facebook'}}
    </button>
    <button
      :class="{
        'bg-transparent border-2 border-gray-300 w-full p-2 mb-8': true,
        'btn-loading': loading.google,
      }"
      :disabled="loading.google || loading.facebook"
      @click="authenticate('google')"
      type="button">
      <img class="h-6 float-left text-black inline-block"
        src="@/assets/img/google-gray.svg"/>
      {{isSignUp ? 'Sign up with Google' : 'Log in with Google'}}
    </button>
  </div>
</template>

<script>
export default {
  name: 'social-login',
  props: {
    isSignUp: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      firebase: this.$firebase,
      loading: { facebook: false, google: false },
    };
  },
  methods: {
    authenticate(option) {
      const provider = option === 'google' ? new this.firebase.auth.GoogleAuthProvider() : new this.firebase.auth.FacebookAuthProvider();
      this.loading[option] = true;

      this.firebase.auth().signInWithPopup(provider).then((result) => {
        this.loading[option] = false;
        const data = {};
        data[`${option}Id`] = result.credential.idToken;
        this.$emit('successful', data);
      }, (error) => {
        this.loading[option] = false;
        this.$emit('error', error.message);
        this.$sentry.captureException(error, { tag: `Social Login - ${option}` });
      });
    },
  },
};
</script>

<style lang="scss">
</style>
