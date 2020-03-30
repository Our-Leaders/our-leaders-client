<template>
  <div>
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
      <a class="cursor-pointer text-primary font-semibold" @click="goToSignIn">log me in</a>
    </p>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'our-forgot-password-form',
  props: {
    goToSignIn: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      authServices: this.$serviceFactory.auth,
      resetEmail: null,
      loading: false,
    };
  },
  methods: {
    ...mapActions([
      'displayError',
      'displaySuccess',
    ]),
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
    showError(message) {
      this.displayError(message);
    },
    showSuccess(message) {
      this.displaySuccess({ message });
    },
  },
};
</script>

<style lang="scss">
</style>
