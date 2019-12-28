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
          <img class="object-cover" :src="politicalParty.logo"/>
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
              <a class="twitter-timeline" href="https://twitter.com/TwitterDev/timelines/539487832448843776?ref_src=twsrc%5Etfw">{{politicalParty.name}} Tweets - Curated tweets by TwitterDev</a>
            </div>
          </div>
        </div>
      </div>
      <div class="w-2/3 px-10 py-4 relative">
        <h3 class="text-6xl mt-8">{{politicalParty.name}} ({{politicalParty.acronym}})</h3>
        <div class="w-full mb-4">
          <div id="votes" class="inline-block pr-5 border-r-2 border-gray-300">
            <img class="inline-block mr-1 md:mr-2 h-3 md:h-4" src="@/assets/img/thumbs-up.svg"/>
            <span class="inline-block mr-2 md:mr-4 h-3 md:h-4 align-middle text-xs md:text-sm">{{politicalParty.vote.up}}</span>
            <img class="inline-block mr-1 mt-2 md:mr-2 h-3 md:h-4" src="@/assets/img/thumbs-down.svg"/>
            <span class="inline-block mr-1 md:mr-2 h-3 md:h-4 align-middle text-xs md:text-sm">{{politicalParty.vote.down}}</span>
          </div>
          <div id="share" class="inline-block pl-5">
            <span class="cursor-pointer text-xs mr-6">Share Profile</span>
            <img class="cursor-pointer inline-block h-4 mr-6" src="@/assets/img/facebook-gray.svg"/>
            <img class="cursor-pointer inline-block h-4 mr-6" src="@/assets/img/twitter-gray.svg"/>
            <img class="cursor-pointer inline-block h-4" src="@/assets/img/instagram-gray.svg"/>
          </div>
        </div>
        <div class="w-full">
          <span class="block text-base capitalize">{{politicalParty.partyDescription}}</span>
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
import { mapActions } from 'vuex';
import { politicalPartiesMock } from '../../constants/examples';

export default {
  name: 'political-party',
  props: {
    politicalPartyId: {
      type: String,
    },
  },
  created() {
    if (this.politicalPartyId) {
      this.getPolitcalParty(this.politicalPartyId);
    } else {
      this.$router.back();
    }
  },
  data() {
    return {
      loading: true,
      mainTabs: [{ label: 'Party Background', value: 'background' }, { label: 'Current Offices', value: 'offices' }, { label: 'Ideology', value: 'ideology' }],
      page: 'background',
      // For now
      politicalParty: politicalPartiesMock[0],
      politicalPartiesServices: this.$serviceFactory.politicalParties,
      processing: false,
    };
  },
  methods: {
    ...mapActions([
      'displayError',
    ]),
    async getPolitcalParty(id) {
      try {
        this.loading = true;
        const response = await this.politicalPartiesServices.getPoliticalParty(id);
        // For now
        this.politicalParty = response.data.politicalParty;
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.displayError(error);
        // Uncomment after we start adding politicians
        // this.$router.back();
      }
    },
    isPage(page) {
      return this.page === page;
    },
    setPage(page) {
      this.page = page;
    },
  },
};
</script>

<style lang="scss">
</style>
