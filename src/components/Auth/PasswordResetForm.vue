<template>
  <form @submit.prevent="resetPassword">
    <div class="mb-8">
      <label class="block font-semibold" for="password">New Password</label>
      <div class="input-fields">
        <input class="w-full py-2"
          type="password"
          name="password"
          v-model="data.password"
          placeholder="Enter new password"
          required/>
      </div>
    </div>
    <div class="mb-8">
      <label class="block font-semibold" for="password">Confirm Password</label>
      <div class="input-fields">
        <input class="w-full py-2"
          type="password"
          name="password"
          v-model="data.confirmPassword"
          placeholder="Re-enter new password"
          required/>
      </div>
    </div>
    <button
      :class="{
        'btn-primary w-full mb-8': true,
        'loading': loading,
      }"
      :disabled="loading">
      Change Password
    </button>
  </form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'our-password-reset-form',
  props: {
    goToSignIn: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      authServices: this.$serviceFactory.auth,
      data: {
        confirmPassword: null,
        password: null,
        token: null,
      },
      loading: false,
    };
  },
  created() {
    this.data.token = this.$route.query.token;
    if (!this.data.token) {
      this.goToSignIn();
    }
  },
  methods: {
    ...mapActions([
      'displayError',
      'displaySuccess',
    ]),
    async resetPassword() {
      if (this.data.password !== this.data.confirmPassword) {
        this.displayError('Your new password must match the confirmation password');
      } else {
        try {
          this.loading = true;
          await this.authServices.resetPassword(this.data);

          this.displaySuccess({ message: 'Your password has been updated successfully' });

          this.goToSignIn();
        } catch (err) {
          this.loading = false;
          this.displayError(err);
        }
      }
    },
  },
};
</script>

<style lang="scss">
</style>
