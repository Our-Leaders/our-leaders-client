<template>
  <div class="inner w-full h-full text-right">
    <our-dropdown
      v-if="hasFetchedSubscriptions"
      class="inline-block mt-5 bg-white font-circular"
      list-margin="-mt-6"
      padding="py-1"
      width="w-64"
      headingFont="font-circular"
      :forceClose="closeDropdown"
      leaveOpen
      listClass="leaders-dropdown-list"
    >
      <template v-slot:heading>
        <button class="btn-subscribe px-4 py-1" :class="{ 'active': subscribed }" @click="loginCheck">
          <span class="align-middle" v-if="!subscribed">{{ subscribeText }}</span>
          <span class="align-middle" v-if="subscribed">Subscribed</span>
          <span class="align-middle loading inline sm ml-2" v-if="processing"></span>
          <img class="ml-2 align-baseline" v-else-if="subscribed" src="@/assets/img/green-tick.svg"/>
        </button>
      </template>
      <our-dropdown-item>
        <label class="flex justify-between text-xs items-center cursor-pointer">
          Be notified on this platform
          <our-checkbox :model="subscription.feeds" :disabled="processing" v-on:change="changeSubscription('feeds', $event)"></our-checkbox>
        </label>
      </our-dropdown-item>
      <our-dropdown-item>
        <label class="flex justify-between text-xs items-center cursor-pointer">
          Receive email notifications
          <our-checkbox :model="subscription.email" :disabled="processing" v-on:change="changeSubscription('email', $event)"></our-checkbox>
        </label>
      </our-dropdown-item>
      <our-dropdown-divider v-show="subscribed"/>
      <our-dropdown-item>
        <a v-show="subscribed" @click="removeSubscription()" class="text-xs text-gray-400 w-full" :class="unsubscribeLinkClass">Unsubscribe from this leader</a>
      </our-dropdown-item>
    </our-dropdown>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'politician',
  created() {
    this.getSubscriptions();
  },
  props: {
    politician: {
      type: Object,
    },
    subscribeText: {
      type: String,
      default: 'Subscribe',
    },
    politicianSubscriptions: {
      type: Array,
      default: () => ([]),
    },
  },
  computed: {
    ...mapGetters([
      'isLoggedIn',
    ]),
    unsubscribeLinkClass() {
      if (this.processing) {
        return 'cursor-not-allowed text-gray-300';
      }
      return '';
    },
    subscribed() {
      return this.subscription.feeds || this.subscription.email;
    },
  },
  data() {
    return {
      processing: false,
      subscriptions: [],
      hasFetchedSubscriptions: false,
      closeDropdown: false,
      filter: {
        position: null,
      },
      subscription: {
        feeds: false,
        email: false,
      },
      subscriptionsServices: this.$serviceFactory.subscriptions,
    };
  },
  methods: {
    ...mapActions([
      'displayError',
      'displaySignUp',
    ]),
    async getSubscriptions() {
      try {
        this.loading = true;
        if (this.politicianSubscriptions.length > 0) {
          this.subscriptions = this.politicianSubscriptions;
        } else {
          const response = await this.subscriptionsServices.getSubscriptions(this.filter);

          // Temporary till we can add type query to subscriptions
          this.subscriptions = response.data.subscriptions.filter(sub => sub.type !== 'newsletter' && sub.politician.id === this.politician.id);
        }
        this.hasFetchedSubscriptions = true;
        this.subscription = {
          feeds: !!this.getSubscriptionIdByType('feeds'),
          email: !!this.getSubscriptionIdByType('email'),
        };
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.hasFetchedSubscriptions = true;
        // TODO: This fires twice everytime the page is reloaded on the politicians page, should probably revisit.
        // this.displayError(error);
      }
    },
    async addSubscription(type) {
      try {
        this.processing = true;
        await this.subscriptionsServices.addSubscription({
          politicianId: this.politician.id,
          type,
        });
        this.subscription[type] = true;
        this.processing = false;
      } catch (error) {
        this.subscription[type] = false;
        this.processing = false;
        this.displayError(error);
      }
    },
    async removeSubscription(type) {
      try {
        this.processing = true;
        this.subscription[type] = true;
        if (type) {
          await this.subscriptionsServices.removeSubscription(this.getSubscriptionIdByType(type));
          this.subscription[type] = false;
        } else {
          await this.subscriptionsServices.removePoliticianSubscriptions(this.politician.id);
          this.closeDropdown = true;
          this.subscription.feeds = false;
          this.subscription.email = false;
        }

        this.processing = false;
      } catch (error) {
        this.subscription[type] = true;
        this.processing = false;
        this.displayError(error);
      }
    },
    async changeSubscription(type, isSubscribed) {
      if (isSubscribed) {
        this.addSubscription(type);
      } else {
        this.removeSubscription(type);
      }
    },
    getSubscriptionIdByType(type) {
      const subscription = this.subscriptions.find(sub => sub.type === type);
      return subscription ? subscription.id : null;
    },
    loginCheck() {
      if (!this.isLoggedIn) {
        this.displaySignUp();
      }
    },
  },
};
</script>
