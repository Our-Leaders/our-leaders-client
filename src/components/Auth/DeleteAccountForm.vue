<template>
  <form @submit.prevent="deleteAccount">
    <div class="mb-8">
      <p>To verify, please enter your password</p>
      <div class="input-fields mt-3">
        <input class="w-full py-2"
          type="password"
          name="password"
          v-model="data.password"
          placeholder="Enter your password"
          required
        />
      </div>
    </div>
    <div class="flex flex-wrap mt-5 mb-6">
      <button :disabled="!data.password" type="submit" class="bg-red-600 text-white hover:opacity-90 w-full py-2 mb-4 lg:w-1/2 xl:w-1/2">
        Yes, delete my account
      </button>
      <button type="button" class="bg-gray-300 hover:opacity-75 w-full py-2 mb-4 lg:w-1/2 xl:w-1/2" @click="$emit('cancel')">
        Cancel
      </button>
    </div>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'our-delete-account-form',
  data() {
    return {
      usersService: this.$serviceFactory.users,
      data: {
        password: null,
      },
    };
  },
  computed: {
    ...mapGetters({
      user: 'user',
    }),
  },
  methods: {
    ...mapActions([
      'displayError',
      'displaySuccess',
    ]),
    async deleteAccount() {
      try {
        await this.usersService.deleteAccount(this.user.id, this.data);
        this.displaySuccess({ message: 'Your account has been deleted successfully' });
        this.$emit('cancel');
        this.$emit('complete');
      } catch (err) {
        this.displayError(err);
      }
    },
  },
};
</script>

<style lang="scss">
  button:disabled {
    cursor: not-allowed;
    opacity: 0.7;

    &:hover {
      opacity: 0.7;
    }
  }
</style>
