<template>
  <div class="h-full">
    <div class="flex flex-col justify-center h-screen mb-4" v-if="loading">
      <div class="w-full text-center">
        <span class="loading lg mx-auto mb-2"></span>
        <span>Loading Details...</span>
      </div>
    </div>
    <div class="flex pb-2" v-if="!loading">
      <div class="w-1/3 py-8 px-16 border-r-2 border-gray-200">
        <div class="passport-wrapper mb-3">
          <img class="object-cover" :src="politician.profileImage"/>
        </div>
        <div class="block mb-10">
          <img class="cursor-pointer inline-block h-4 mr-6" src="@/assets/img/facebook-gray.svg"/>
          <img class="cursor-pointer inline-block h-4 mr-6" src="@/assets/img/twitter-gray.svg"/>
          <img class="cursor-pointer inline-block h-4" src="@/assets/img/instagram-gray.svg"/>
        </div>
        <div class="flex flex-wrap">
          <div class="w-full border-b-1 border-gray-400">
            <span class="text-2xl mr-2">Tweets</span>
            <span class="text-base mr-1">by</span>
            <span class="cursor-pointer twitter-link text-base">@MBuhari</span>
            <button class="float-right align-middle font-semibold twitter-button px-2 rounded-full">Follow</button>
            <hr class="mt-2"/>

            <!-- Twitter -->
            <div class="timeline-wrapper">
              <a class="twitter-timeline" href="https://twitter.com/TwitterDev/timelines/539487832448843776?ref_src=twsrc%5Etfw">National Park Tweets - Curated tweets by TwitterDev</a>
            </div>
          </div>
        </div>
      </div>
      <div class="w-2/3 px-10 py-4 relative">
        <h3 class="text-6xl mt-8">{{politician.name}}</h3>
        <button class="btn-subscribe px-4 py-2 absolute top-0 right-0 my-5 mr-17"
          :class="{ 'active': hasSubscribed }"
          @click="toggleSubscription">
          <span class="align-middle loading sm" v-if="processing"></span>
          <span class="align-middle" v-if="!hasSubscribed && !processing">Subscribe to {{lastName}}</span>
          <span class="align-middle" v-if="hasSubscribed && !processing">Subscribed</span>
          <img class="ml-2" src="@/assets/img/green-tick.svg"/>
        </button>
        <div class="w-full mb-4">
          <div id="votes" class="inline-block pr-5 border-r-2 border-gray-300">
            <img class="inline-block mr-1 md:mr-2 h-3 md:h-4" src="@/assets/img/thumbs-up.svg"/>
            <span class="inline-block mr-2 md:mr-4 h-3 md:h-4 align-middle text-xs md:text-sm">{{politician.vote.up}}</span>
            <img class="inline-block mr-1 mt-2 md:mr-2 h-3 md:h-4" src="@/assets/img/thumbs-down.svg"/>
            <span class="inline-block mr-1 md:mr-2 h-3 md:h-4 align-middle text-xs md:text-sm">{{politician.vote.down}}</span>
          </div>
          <div id="share" class="inline-block pl-5">
            <span class="cursor-pointer text-xs mr-6">Share Profile</span>
            <img class="cursor-pointer inline-block h-4 mr-6" src="@/assets/img/facebook-gray.svg"/>
            <img class="cursor-pointer inline-block h-4 mr-6" src="@/assets/img/twitter-gray.svg"/>
            <img class="cursor-pointer inline-block h-4" src="@/assets/img/instagram-gray.svg"/>
          </div>
        </div>
        <div class="w-full" v-if="position.inOffice">
          <span class="block text-base capitalize">{{position.name}}</span>
          <span class="block text-base">{{position.duration}}</span>
        </div>
        <div class="w-9/12 mt-6 pr-4">
          <our-tabs class="mb-1" v-on:change="setPage" :tabs='mainTabs' :tab-type="'secondary'"></our-tabs>
        </div>
        <div class="flex flex-col-reverse lg:flex-row xl:flex-row">
          <div class="w-full lg:w-9/12 xl:w-9/12 align-top block lg:inline-block xl:inline-block relative">
            <transition-group name="fade" mode="out-in">
              <div class="absolute top-0 left-0" v-for="tab of mainTabs" :key="tab.value" v-show="isPage(tab.value)">{{tab.label}}</div>
            </transition-group>
          </div>
          <div class="w-full lg:w-3/12 xl:w-3/12 block lg:inline-block xl:inline-block">
            <!-- For Now -->
            <our-side-scroll :options="mainTabs"></our-side-scroll>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { politiciansMock } from '../../constants/examples';
import ValidatorUtil from '../../helpers/validatorUtil';

export default {
  name: 'politician',
  props: {
    politicianId: {
      type: String,
    },
  },
  created() {
    if (this.politicianId) {
      this.getPolitician(this.politicianId);
      if (this.isLoggedIn) {
        this.checkSubscriptions();
      }
    } else {
      this.$router.back();
    }
  },
  computed: {
    ...mapGetters([
      'isLoggedIn',
      'viewedPoliticians',
    ]),
    hasSubscribed() {
      return this.subscribed;
    },
    lastName() {
      return ValidatorUtil.isDefined(this.politician.name) ? this.politician.name.split(' ')[1] : '';
    },
    position() {
      const background = this.politician.politicalBackground.find(x => x.inOffice);
      if (!background) {
        return { inOffice: false };
      }

      const duration = `${(new Date(background.startDate)).getFullYear()} - ${(new Date(background.endDate)).getFullYear()}`;
      return { name: `${background.position}, ${background.institution}`, duration, inOffice: true };
    },
  },
  data() {
    return {
      loading: true,
      mainTabs: [{ label: 'Background', value: 'background' }, { label: 'Accomplishments', value: 'accomplishments' }, { label: 'Manifesto', value: 'manifesto' }, { label: 'Recent updates', value: 'recent' }],
      page: 'background',
      // For now
      politician: politiciansMock[0],
      politiciansServices: this.$serviceFactory.politicians,
      processing: false,
      subscribed: false,
      subscriptionId: null,
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
        const response = await this.subscriptionsServices.addSubscription({
          politicianId: this.politicianId,
        });
        this.subscribed = true;
        this.subscriptionId = response.data.subscription.id;
        this.processing = false;
      } catch (error) {
        this.subscribed = false;
        this.processing = false;
        this.displayError(error);
      }
    },
    async checkSubscriptions() {
      try {
        this.processing = true;
        const response = await this.subscriptionsServices.checkSubscription(this.politicianId);
        this.subscribed = true;
        this.subscriptionId = response.data.subscription.id;
        this.processing = false;
      } catch (error) {
        this.subscribed = false;
        this.processing = false;
        this.displayError(error);
      }
    },
    async getPolitician(id) {
      try {
        this.loading = true;
        const cachedPolitician = this.viewedPoliticians[id];

        if (cachedPolitician) {
          this.politician = cachedPolitician;
        } else {
          const response = await this.politiciansServices.getPolitician(id);
          // For now
          this.politician = response.data.politician;
          this.$store.commit('addToViewedPoliticians', this.politician);
        }
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.displayError(error);
        // Uncomment after we start adding politicians
        // this.$router.back();
      }
    },
    async removeSubscription() {
      try {
        this.processing = true;
        await this.subscriptionsServices.removeSubscription({
          politicianId: this.politicianId,
        });
        this.subscribed = true;
        this.processing = false;
      } catch (error) {
        this.subscribed = false;
        this.processing = false;
        this.displayError(error);
      }
    },
    isPage(page) {
      return this.page === page;
    },
    setPage(page) {
      this.page = page;
    },
    subscribe(subscribed) {
      this.subscribed = subscribed;
    },
    toggleSubscription() {
      if (this.processing) { return; }

      if (this.subscribed) {
        this.removeSubscription();
      } else {
        this.addSubscription();
      }
    },
  },
};
</script>

<style lang="scss">
</style>
