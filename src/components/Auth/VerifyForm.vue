<template>
  <div>
    <p class="mb-10">
      Hello {{data.email}}, we're glad to have you.
      <br/>
      <br/>
      We've just sent your <b>Verification Code</b> to your email. Why do we need this?
      <br/>
      <br/>
      In order to keep suspicious accounts and activities off the platform, we require more information for verification purposes. Thank you for understanding!
    </p>
    <form @submit.prevent="verify">
      <div class="mb-6">
        <label class="block font-semibold" for="verification">
          Verification pin
          <span
            class="block cursor-pointer font-regular text-xs
            text-gray-500 float-right align-middle"
            @click="generateVerificationCode">
            Didn't receive a pin? Click to resend
          </span>
        </label>
        <input class="verification field w-full py-2"
          ref="verification"
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
        :disabled="loading || !codeSent">
        Verify
      </button>
      <button
        class="btn w-full mb-8"
        type="button"
        @click="signOut"
        :disabled="loading">
        Sign Out
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'our-verify-form',
  props: {
    goToHome: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      authServices: this.$serviceFactory.auth,
      codeSent: false,
      data: {
        email: null,
        verificationCode: null,
      },
      loading: false,
      sending: false,
    };
  },
  created() {
    if (this.user) {
      this.data.email = this.user.email;
    }
    setTimeout(() => this.$refs.verification.focus(), 1000);
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
    async generateVerificationCode() {
      try {
        this.sending = true;
        await this.authServices.sendVerificationCode();
        this.showSuccess('Verification code was successfully sent to your email.');
        this.sending = false;
        this.codeSent = true;
      } catch (err) {
        this.sending = false;
        this.showError('An error occured while sending you a pin.');
      }
    },
    async verify() {
      try {
        this.loading = true;
        const response = await this.authServices.verifyNumber({
          verificationCode: this.data.verificationCode,
        });

        this.showSuccess('Email verified.');
        this.$store.commit('setCurrentUser', response.data.user);
        this.goToHome();
      } catch (err) {
        this.loading = false;
        this.showError('Email not verified.');
      }
    },
    showError(message) {
      this.displayError(message);
    },
    showSuccess(message) {
      this.displaySuccess({ message });
    },
    signOut() {
      this.$store.commit('clearCurrentUser');
      this.$store.commit('clearJWT');
      this.$router.push('/');
    },
  },
};
</script>

<style lang="scss">
</style>
