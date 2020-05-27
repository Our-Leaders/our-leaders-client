<template>
<div>
  <div class="block" v-show="viewType === 'primary'">
    <div class="h-full w-full relative">
      <div class="h-full w-full hidden-overflow">
        <div class="inner">
          <button class="w-1/2 mx-auto border-2 leading border-white p-2 text-white hover:bg-white hover:text-black"
            @click="$emit('click', politician.id)">
            See More
          </button>
        </div>
      </div>
      <div class="w-full overflow-hidden h-30 md:h-40 lg:h-40 xl:h-40">
        <img :src="politician.profileImage" class="w-full h-full object-cover"/>
      </div>
      <div class="w-full my-1 md:my-2">
        <img class="inline-block mr-1 md:mr-2 h-3 md:h-4" src="../assets/img/thumbs-up.svg"/>
        <span class="inline-block mr-2 md:mr-4 h-3 md:h-4 align-middle text-xs md:text-sm">{{politician.vote.up}}</span>
        <img class="inline-block mr-1 md:mr-2 h-3 md:h-4" src="../assets/img/thumbs-down.svg"/>
        <span class="inline-block mr-1 md:mr-2 h-3 md:h-4 align-middle text-xs md:text-sm">{{politician.vote.down}}</span>
      </div>
      <h4 class="font-semibold text-base md:text-lg">{{politician.name}}</h4>
      <h4 class="capitalize overflow-ellipse text-sm md:text-base">{{position}}</h4>
    </div>
  </div>
  <div class="block relative" v-show="viewType === 'secondary'">
    <div class="w-full py-4 border-b-2 border-gray-200">
      <div class="overflow-hidden h-10 w-10 inline-block mr-4 rounded">
        <img :src="politician.profileImage" class="w-full h-full object-cover"/>
      </div>
      <div class="inline-block text-block align-baseline">
        <span class="block text-base capitalize font-semibold mb-1">{{politician.name}}</span>
        <span class="block text-sm capitalize">{{position}}</span>
      </div>
    </div>

    <div class="absolute w-full h-full top-0 left-0">
      <div class="inner w-full h-full text-right">
        <our-dropdown class="inline-block mt-5 bg-white font-circular" list-margin="-mt-6" padding="py-1" width="w-64" headingFont="font-circular" leaveOpen listClass="leaders-dropdown-list">
          <template v-slot:heading>
            <button class="btn-subscribe px-4 py-1" :class="{ 'active': subscribed }">
              <span class="align-middle" v-if="!subscribed">Subscribe</span>
              <span class="align-middle" v-if="subscribed">Subscribed</span>
              <span class="align-middle loading inline sm ml-2" v-if="processing"></span>
              <img class="ml-2 align-baseline" v-else-if="subscribed" src="@/assets/img/green-tick.svg"/>
            </button>
          </template>
          <our-dropdown-item>
            <label class="flex justify-between text-xs items-center">
              Be notified on this platform
              <our-checkbox :model="subscription.feeds" :disabled="processing" v-on:change="changeSubscription('feeds', $event)"></our-checkbox>
            </label>
          </our-dropdown-item>
          <our-dropdown-item>
            <label class="flex justify-between text-xs items-center">
              Receive email notifications
              <our-checkbox :model="subscription.email" :disabled="processing" v-on:change="changeSubscription('email', $event)"></our-checkbox>
            </label>
          </our-dropdown-item>
          <our-dropdown-divider v-show="subscribed"/>
          <our-dropdown-item>
            <a v-show="subscribed" @click="removeSubscription" class="text-xs text-gray-400 w-full" :class="unsubscribeLinkClass">Unsubscribe from this leader</a>
          </our-dropdown-item>
        </our-dropdown>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapActions } from 'vuex';
import StringUtil from '@/helpers/stringUtil';

export default {
  name: 'politician',
  props: {
    politician: {
      type: Object,
    },
    viewType: {
      type: String,
      default: 'primary',
    },
    subscriptions: {
      type: Array,
    },
  },
  computed: {
    position() {
      if (this.politician.politicalBackground.length > 0) {
        const background = this.politician.politicalBackground.find(x => x.inOffice);
        if (!background) { return 'Not in Office'; }
        return StringUtil.getPoliticalPosition(background);
      }
      return 'N/A';
    },
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
      subscription: {
        feeds: !!this.getSubscriptionIdByType('feeds'),
        email: !!this.getSubscriptionIdByType('email'),
      },
      subscriptionsServices: this.$serviceFactory.subscriptions,
    };
  },
  methods: {
    ...mapActions([
      'displayError',
    ]),
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
        await this.subscriptionsServices.removeSubscription(this.getSubscriptionIdByType(type));

        this.subscription[type] = false;
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
  },
};
</script>

<style lang="scss">
  .text-block {
    vertical-align: text-bottom;
  }
</style>
