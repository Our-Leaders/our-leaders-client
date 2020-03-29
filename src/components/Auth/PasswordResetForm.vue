<template>
  <form @submit.prevent="proceed">
    <div class="mb-6">
      <label class="block" for="password">Current Password</label>
      <input class="w-11/12 py-2"
        type="password"
        name="password"
        v-model="data.password"
        placeholder="Enter current password"
        required/>
    </div>
    <div class="mb-6">
      <label class="block" for="password">New Password</label>
      <input class="w-11/12 py-2"
        type="password"
        name="password"
        v-model="data.newPassword"
        placeholder="Enter new password"
        required/>
    </div>
    <div class="mb-6">
      <label class="block" for="password">Confirm New Password</label>
      <input class="w-11/12 py-2"
        type="password"
        name="password"
        v-model="data.newPasswordConfirm"
        placeholder="Re-enter new password"
        required/>
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
  data() {
    return {
      authServices: this.$serviceFactory.auth,
      data: {
        password: null,
        newPassword: null,
      },
      newPasswordConfirm: null,
      loading: false,
    };
  },
  methods: {
    ...mapActions([
      'displayError',
      'displaySuccess',
    ]),
    async changePassword() {
      if (this.newPassword !== this.newPasswordConfirm) {
        return this.displayError('Your new password must match the confirmation password');
      }
      try {
        this.loading = true;
        await this.authServices.changePassword(this.data);

        this.displaySuccess({ message: 'Your password has been updated successfully' });

        this.$router.push('/auth/sign-in');
      } catch (err) {
        this.loading = false;
        this.displayError(err);
      }
      return null;
    },
  },
};
</script>

<style lang="scss">
</style>
