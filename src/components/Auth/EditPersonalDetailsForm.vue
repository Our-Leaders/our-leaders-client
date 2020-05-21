<template>
  <form @submit.prevent="updateDetails">
    <div class="mb-8">
      <p>Changes to your personal information</p>
      <div class="input-fields mt-3">
        <input class="w-1/2 py-2"
          type="text"
          name="firstName"
          v-model="data.firstName"
          minlength="2"
          placeholder="First Name"
          autocomplete="off"
          required
        />
        <input class="w-1/2 py-2"
          type="text"
          name="lastName"
          v-model="data.lastName"
          minlength="2"
          placeholder="Last Name"
          autocomplete="off"
          required
        />
      </div>
    </div>
    <div class="flex flex-wrap mt-5 mb-6">
      <button :disabled="!data.firstName || !data.lastName" type="submit" class="bg-green-600 text-white hover:opacity-90 w-full py-2 mb-4 lg:w-1/2 xl:w-1/2">
        Update
      </button>
      <button type="button" class="btn-cancel hover:opacity-75 w-full py-2 mb-4 lg:w-1/2 xl:w-1/2" @click="$emit('cancel')">
        Cancel
      </button>
    </div>
  </form>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'our-edit-personal-details-form',
  data() {
    return {
      usersService: this.$serviceFactory.users,
      data: {
        firstName: null,
        lastName: null,
      },
    };
  },
  mounted() {
    this.data.firstName = this.user.firstName ? this.user.firstName : this.data.firstName;
    this.data.lastName = this.user.lastName ? this.user.lastName : this.data.lastName;
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
    ...mapMutations({
      updateCurrentUser: 'updateCurrentUser',
    }),
    async updateDetails() {
      try {
        await this.usersService.updateUser(this.user.id, this.data);
        this.displaySuccess({ message: 'Your account has been updated successfully' });
        this.updateCurrentUser({ key: 'firstName', value: this.data.firstName });
        this.updateCurrentUser({ key: 'lastName', value: this.data.lastName });
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

  .btn-cancel {
    background: #F3F3F3;
  }
</style>
