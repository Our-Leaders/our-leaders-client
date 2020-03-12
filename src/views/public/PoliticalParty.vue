<template>
  <div class="relative">
    <div class="flex flex-col justify-center h-screen mb-4" v-if="loading">
      <div class="w-full text-center">
        <span class="loading lg mx-auto mb-2"></span>
        <span>Loading Details...</span>
      </div>
    </div>
    <div class="flex flex-wrap pb-2" v-if="!loading">
      <div class="w-full md:w-1/3 md:py-8 px-2 lg:px-16 lg:border-r-2 border-gray-200">
        <div class="passport-wrapper mb-3">
          <img class="object-cover" :src="politicalParty.logo"/>
        </div>
        <div class="block mb-10">
          <a v-if="politicalParty.socials.facebook" target="_blank" :href="`https://facebook.com/${politicalParty.socials.facebook}`"><img class="cursor-pointer inline-block h-4 mr-6" src="@/assets/img/facebook-gray.svg"/></a>
          <a v-if="politicalParty.socials.twitter" target="_blank" :href="`https://twitter.com/${politicalParty.socials.twitter}`"><img class="cursor-pointer inline-block h-4 mr-6" src="@/assets/img/twitter-gray.svg"/></a>
          <a v-if="politicalParty.socials.instagram" target="_blank" :href="`https://instagram.com/${politicalParty.socials.instagram}`"><img class="cursor-pointer inline-block h-4" src="@/assets/img/instagram-gray.svg"/></a>
        </div>
        <div class="hidden md:flex flex-wrap" v-if="politicalParty.socials.twitter">
          <div class="w-full border-b-1 border-gray-400">
            <!-- <span class="text-2xl mr-2">Tweets</span>
            <span class="text-base mr-1">by</span>
            <span class="cursor-pointer twitter-link text-base">@MBuhari</span>
            <button class="float-right align-middle font-semibold twitter-button px-2 rounded-full">Follow</button>
            <hr class="mt-2"/> -->

            <!-- Twitter -->
            <div class="timeline-wrapper">
              <twitter>
                <div slot="loading">loading .....</div>
                <a class="twitter-timeline" :href="`https://twitter.com/${politicalParty.socials.twitter}?ref_src=twsrc%5Etfw`"></a>
              </twitter>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="w-2/3 px-10 py-4 relative"> -->
      <div class="w-full md:w-2/3 pl-2 md:px-10 py-1 md:py-4 md:max-h-screen md:overflow-y-scroll relative" sticky-container>
        <h3 class="text-6xl mt-8">{{politicalParty.name}} ({{politicalParty.acronym}})</h3>
        <div class="w-full mb-4">
          <div id="votes" class="inline-block pr-5 border-r-2 border-gray-300">
            <img class="inline-block mr-1 md:mr-2 h-3 md:h-4" src="@/assets/img/thumbs-up.svg"/>
            <span class="inline-block mr-2 md:mr-4 h-3 md:h-4 align-middle text-xs md:text-sm">{{politicalParty.vote ? politicalParty.vote.up : '0'}}</span>
            <img class="inline-block mr-1 mt-2 md:mr-2 h-3 md:h-4" src="@/assets/img/thumbs-down.svg"/>
            <span class="inline-block mr-1 md:mr-2 h-3 md:h-4 align-middle text-xs md:text-sm">{{politicalParty.vote ? politicalParty.vote.down : '0'}}</span>
          </div>
          <div id="share" class="inline-block pl-5">
            <span class="cursor-pointer text-xs mr-6">Share Profile</span>
            <a v-if="politicalParty.socials.facebook" class="relative" target="_blank" :href="`https://facebook.com/${politicalParty.socials.facebook}`">
                <div class="absolute opacity-0 h-full w-full top-0 left-0">
                  <ShareFacebook :title="`Click to read more about ${politicalParty.name}`" :url="`https://ourleaders.africa/political-parties/${politicalParty.socials.facebook}`"></ShareFacebook>
                </div>
                <img class="cursor-pointer inline-block h-4 mr-6" src="@/assets/img/facebook-gray.svg"/>
              </a>
              <a v-if="politicalParty.socials.twitter" class="relative" href="#">
                <div class="absolute opacity-0 h-full w-full top-0 left-0">
                  <ShareTwitter :title="`Click to read more about ${politicalParty.name}`" :url="`https://ourleaders.africa/political-parties/${politicalParty.socials.twitter}`"></ShareTwitter>
                </div>
                <img class="cursor-pointer inline-block h-4 mr-6" src="@/assets/img/twitter-gray.svg"/>
              </a>
          </div>
        </div>
        <!-- <div class="w-full">
          <span class="block text-base capitalize">{{politicalParty.partyDescription}}</span>
        </div> -->
        <div v-sticky sticky-offset="offset" sticky-side="top" ref="stickyTop">
          <div class="w-full md:w-9/12 overflow-x-scroll mt-6 md:pr-4">
            <our-tabs class="mb-1" v-on:change="setPage" :tabs='mainTabs' :tab-type="'secondary'"></our-tabs>
          </div>
        </div>
        <div class="flex flex-col-reverse lg:flex-row xl:flex-row">
          <div class="w-full lg:w-9/12 xl:w-9/12 align-top block lg:inline-block xl:inline-block relative">
            <transition-group name="fade" mode="out-in">
              <div class="relative top-0 left-0" key="background" v-if="isPage('background')">
                <div class="flex">
                  <div class="w-full py-2 pr-2">
                    <h3 class="font-bold mb-3 text-xl">Party background</h3>
                    <p>{{politicalParty.partyBackground}}</p>
                    <hr class="my-4"/>
                    <h3 class="font-bold mb-3 text-xl">Personal Description</h3>
                    <div class="flex flex-wrap mb-4">
                      <span class="w-1/3 my-1 inline-block">Founded</span>
                      <span class="w-2/3 my-1 inline-block">{{politicalParty.partyDescription.founded}}</span>
                      <span class="w-1/3 my-1 inline-block">Chairman</span>
                      <span class="w-2/3 my-1 inline-block">{{politicalParty.partyDescription.partyChairman}}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="relative top-0 left-0 w-full" key="offices" v-if="isPage('offices')">
                <our-offices :data="politicians"></our-offices>
              </div>
              <div class="relative top-0 left-0 w-full" key="ideology" v-if="isPage('ideology')">
                <p class="m-2 md:m-6 w-full text-center" v-if="!politicalParty.ideology">There is no current ideology.</p>
                <p class="m-2 md:m-6" v-if="politicalParty.ideology" v-html="politicalParty.ideology"></p>
              </div>
            </transition-group>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'political-party',
  props: {
    politicalPartyId: {
      type: String,
    },
  },
  created() {
    if (!this.politicalParty) {
      this.$router.back();
    }
    this.loading = false;
    this.getPoliticians();
  },
  computed: {
    ...mapGetters({
      politicalParty: 'politicalParty',
    }),
    totalPoliticians() {
      return this.politicians ? this.politicians.length : 0;
    },
  },
  data() {
    return {
      loading: true,
      mainTabs: [{ label: 'Party Background', value: 'background' }, { label: 'Current Offices (0)', value: 'offices' }, { label: 'Ideology', value: 'ideology' }],
      page: 'background',
      politicians: [],
      politiciansServices: this.$serviceFactory.politicians,
      processing: false,
    };
  },
  methods: {
    ...mapActions([
      'displayError',
    ]),
    async getPoliticians() {
      try {
        const response = await this.politiciansServices.getPoliticians({
          politicalPartyId: this.politicalParty.id,
          status: 'current',
          limit: 500,
        });
        this.politicians = response.data.politicians;
        this.mainTabs[1].label = `Current Offices (${response.data.total})`;
      } catch (error) {
        this.displayError(error);
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
