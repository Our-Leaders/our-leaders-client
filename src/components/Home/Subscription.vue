<template>
<div class="w-full">
  <div class="subscription block relative" v-if="!full">
    <slot/>
    <form class="relative w-full subscribe-form px-6">
      <input class="subscribe-input placeholder-gray-96 md:placeholder-transparent font-circular" placeholder="Enter email" type="text" v-model="email" :disabled="processing"/>
      <button class="bg-primary border border-primary py-2 px-12 outline-none text-white h-full w-full md:w-auto" type="submit" @click.prevent="subscribe" :disabled="!email || processing">{{ text ? text : 'Subscribe'}}</button>
    </form>
  </div>
  <div v-if="full">
    <slot/>
    <form>
      <input class="field w-full mt-1 mb-6 py-2 pl-2 bg-white"
        :disabled="processing"
        type="text"
        id="query"
        name="query"
        placeholder="Enter email"
        v-model="email"/>
      <button
        class="btn-primary py-2 lg:py-0 xl:py-0 w-full h-full"
        @click.prevent="subscribe"
        :disabled="processing">
        {{ text ? text : 'Subscribe'}}
      </button>
    </form>
  </div>
</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'subscription',
  props: {
    full: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
    },
  },
  data() {
    return {
      email: null,
      processing: false,
      subscriptionsServices: this.$serviceFactory.subscriptions,
    };
  },
  methods: {
    ...mapActions([
      'displayError',
      'displaySuccess',
    ]),
    async subscribe() {
      try {
        this.processing = true;
        await this.subscriptionsServices.addSubscription({
          email: this.email.trim().toLowerCase(),
          type: 'newsletter',
        });
        this.email = null;
        this.processing = false;
        this.displaySuccess({ message: 'You have successfully been subscribed to our news letter.' });
      } catch (error) {
        this.processing = false;
        this.displayError(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .subscribe-text {
    font-size: 3rem;
    line-height: 3.875rem;

    @screen lg {
      font-size: 3.75rem;
    }
  }

  .subscribe-form {
    margin-top: 3.75rem;
    height: 3rem;

    .subscribe-input {
      @apply border-b border-gray-c4 outline-none;
      width: 44rem;
      height: 100%;
      margin-bottom: 1rem;
      padding: 0 0.725rem;
      width: 100%;

      @screen md {
        @apply bg-gray-fa;
        width: 32.75rem;
      }
    }
  }
</style>
