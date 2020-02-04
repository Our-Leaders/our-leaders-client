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
        <img :src="politician.profileImage.url" class="w-full object-cover"/>
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

    <div class="absolute w-full h-full top-0 left-0 hidden-overflow-transparent">
      <div class="inner w-full h-full text-right">
        <button class="btn-grey-outline inline-block px-4 py-1 ml-2 mt-6">Preferences</button>
        <button class="btn-grey-outline inline-block px-4 py-1 ml-2 mt-6"
          v-show="!this.subscribed"
          :disabled="processing"
          @click="addSubscription">Subscribe</button>
        <button class="btn-grey-outline inline-block px-4 py-1 ml-2 mt-6"
          v-show="this.subscribed"
          :disabled="processing"
          @click="removeSubscription">Unsubscribe</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'politician',
  props: {
    politician: {
      type: Object,
    },
    subscribed: {
      type: Boolean,
      default: false,
    },
    viewType: {
      type: String,
      default: 'primary',
    },
  },
  computed: {
    position() {
      if (this.politician.politicalBackground.length > 0) {
        const background = this.politician.politicalBackground.find(x => x.inOffice);
        if (!background) { return 'Not in Office'; }
        return `${background.position}, ${background.institution}`;
      }
      return 'N/A';
    },
  },
  data() {
    return {
      processing: false,
      subscriptionsServices: this.$serviceFactory.subscriptions,
    };
  },
  methods: {
    ...mapActions([
      'displayError',
    ]),
    async addSubscription() {
      try {
        this.processing = true;
        await this.subscriptionsServices.addSubscription({
          politicianId: this.politician.id,
        });
        this.subscribed = true;
        this.processing = false;
      } catch (error) {
        this.subscribed = false;
        this.processing = false;
        this.displayError(error);
      }
    },
    async removeSubscription() {
      try {
        this.processing = true;
        this.subscribed = true;
        await this.subscriptionsServices.removeSubscription({
          politicianId: this.politician.id,
        });

        this.subscribed = false;
        this.processing = false;
      } catch (error) {
        this.subscribed = true;
        this.processing = false;
        this.displayError(error);
      }
    },
  },
};
</script>

<style lang="scss">
  .text-block {
    vertical-align: text-bottom;
  }
</style>
