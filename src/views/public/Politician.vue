<template>
  <div class="relative mb-2">
    <div class="flex flex-col justify-center min-h-screen mb-4 overflow-y-scroll md:overflow-y-auto" v-if="loading">
      <div class="w-full text-center">
        <span class="loading lg mx-auto mb-2"></span>
        <span>Loading Details...</span>
      </div>
    </div>
    <div class="flex flex-wrap pb-2">
      <div class="left-section md:absolute md:max-h-screen py-2 md:py-8 px-2 lg:px-17 xl:px-17 lg:border-r-2 xl:border-r-2 border-gray-200 md:overflow-y-scroll" v-if="!loading">
        <div class="md:hidden mb-4">
          <h3 class="text-5xl leading-tight mb-3">{{politician.name}}</h3>
          <div class="w-full" v-if="position.inOffice">
            <span class="block text-base capitalize">{{position.name}}</span>
            <span class="block text-base">{{position.duration}}</span>
          </div>
          <div class="w-full mb-2" v-else>
            <span class="block text-base capitalize">Not in Office</span>
          </div>
          <our-politician-subscription :politician="politician" :subscribeText="`Subscribe to ${lastName}`"></our-politician-subscription>
        </div>
        <div class="passport-wrapper mb-3 md:max-w-passport">
          <img class="object-cover" :src="politician.profileImage"/>
        </div>
        <div class="hidden md:flex flex-wrap" v-if="stuck">
          <div class="w-7/12">
            <h5 class="hidden md:block pr-2 text-xl font-bold overflow-ellipse">{{politician.name}}</h5>
          </div>
          <div class="w-5/12">
            <div id="votes" class="inline-block float-right" v-if="politician.vote">
              <img class="inline-block mr-1 h-4 md:h-4 cursor-pointer"
                :src="hasVoted && isUpvote ? require('@/assets/img/thumbs-up-active.svg') : require('@/assets/img/thumbs-up.svg')"
                @click="voteForPolitician(true)"/>
              <span class="inline-block mr-1 h-4 align-middle text-xs">{{politician.vote.up}}</span>
              <img class="inline-block mr-1 mt-2 h-4 md:h-4 cursor-pointer"
                :src="hasVoted && !isUpvote ? require('@/assets/img/thumbs-down-active.svg') : require('@/assets/img/thumbs-down.svg')"
                @click="voteForPolitician(false)"/>
              <span class="inline-block mr-1 h-4 align-middle text-xs">{{politician.vote.down}}</span>
            </div>
          </div>
          <div class="w-full mt-2">
            <div class="hidden md:block pr-2 w-full" v-if="position.inOffice">
              <span class="block text-base capitalize">{{position.name}}</span>
            </div>
            <div class="hidden md:block pr-2 w-full" v-else>
              <span class="block text-base capitalize">Not in Office</span>
            </div>
          </div>
          <div class="w-full my-4">
            <div class="inline-block pr-10 border-r">
              <span class="block text-xs w-full">Follow {{firstName}}</span>
              <div id="share" class="inline-block">
                <a v-if="politician.socials.facebook" target="_blank" :href="`https://facebook.com/${politician.socials.facebook}`"><img class="cursor-pointer inline-block h-4 mr-6" src="@/assets/img/facebook-gray.svg"/></a>
                <a v-if="politician.socials.twitter" target="_blank" :href="`https://twitter.com/${politician.socials.twitter}`"><img class="cursor-pointer inline-block h-4 mr-6" src="@/assets/img/twitter-gray.svg"/></a>
                <a v-if="politician.socials.instagram" target="_blank" :href="`https://instagram.com/${politician.socials.instagram}`"><img class="cursor-pointer inline-block h-4" src="@/assets/img/instagram-gray.svg"/></a>
              </div>
            </div>
            <div class="inline-block pl-10">
              <span class="block text-xs w-full">Share Profile</span>
              <div id="share" class="inline-block">
                <a v-if="politician.socials.facebook" class="relative" target="_blank" :href="`https://facebook.com/${politician.socials.facebook}`">
                  <div class="absolute opacity-0 h-full w-full top-0 left-0">
                    <ShareFacebook title="Politician Test" :url="`https://ourleaders.africa/politicians/${politician.socials.facebook}`"></ShareFacebook>
                  </div>
                  <img class="cursor-pointer inline-block h-4 mr-6" src="@/assets/img/facebook-gray.svg"/>
                </a>
                <a v-if="politician.socials.twitter" class="relative" href="#">
                  <div class="absolute opacity-0 h-full w-full top-0 left-0">
                    <ShareTwitter :title="`Click to read more about ${politician.name}`" :url="`https://ourleaders.africa/politicians/${politician.socials.twitter}`"></ShareTwitter>
                  </div>
                  <img class="cursor-pointer inline-block h-4 mr-6" src="@/assets/img/twitter-gray.svg"/>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="flex md:hidden w-full justify-between px-3">
          <div id="votes" class="inline-block pr-5" v-if="politician.vote">
            <img class="inline-block mr-2 md:mr-2 h-5 cursor-pointer"
              :src="hasVoted && isUpvote ? require('@/assets/img/thumbs-up-active.svg') : require('@/assets/img/thumbs-up.svg')"
              @click="voteForPolitician(true)"/>
            <span class="inline-block mr-3 md:mr-4 h-5 align-middle text-sm md:text-sm">{{politician.vote.up}}</span>
            <img class="inline-block mr-2 mt-2 md:mr-2 h-5 cursor-pointer"
              :src="hasVoted && !isUpvote ? require('@/assets/img/thumbs-down-active.svg') : require('@/assets/img/thumbs-down.svg')"
              @click="voteForPolitician(false)"/>
            <span class="inline-block mr-2 md:mr-2 h-5 align-middle text-sm md:text-sm">{{politician.vote.down}}</span>
          </div>
          <div id="share" class="inline-block">
            <a v-if="politician.socials.facebook" target="_blank" :href="`https://facebook.com/${politician.socials.facebook}`"><img class="cursor-pointer inline-block h-5 mr-6" src="@/assets/img/facebook-gray.svg"/></a>
            <a v-if="politician.socials.twitter" target="_blank" :href="`https://twitter.com/${politician.socials.twitter}`"><img class="cursor-pointer inline-block h-5 mr-6" src="@/assets/img/twitter-gray.svg"/></a>
            <a v-if="politician.socials.instagram" target="_blank" :href="`https://instagram.com/${politician.socials.instagram}`"><img class="cursor-pointer inline-block h-5" src="@/assets/img/instagram-gray.svg"/></a>
          </div>
        </div>
        <div class="w-full block md:hidden px-3 mt-4">
          <span class="block text-xs w-full">Share Profile</span>
          <div id="share" class="inline-block">
            <a v-if="politician.socials.facebook" class="relative" target="_blank" :href="`https://facebook.com/${politician.socials.facebook}`">
              <div class="absolute opacity-0 h-full w-full top-0 left-0">
                <ShareFacebook title="Politician Test" :url="`https://ourleaders.africa/politicians/${politician.socials.facebook}`"></ShareFacebook>
              </div>
              <img class="cursor-pointer inline-block h-5 mr-6" src="@/assets/img/facebook-gray.svg"/>
            </a>
            <a v-if="politician.socials.twitter" class="relative" href="#">
              <div class="absolute opacity-0 h-full w-full top-0 left-0">
                <ShareTwitter :title="`Click to read more about ${politician.name}`" :url="`https://ourleaders.africa/politicians/${politician.socials.twitter}`"></ShareTwitter>
              </div>
              <img class="cursor-pointer inline-block h-5 mr-6" src="@/assets/img/twitter-gray.svg"/>
            </a>
          </div>
        </div>
        <div class="hidden md:block mb-10" v-if="!stuck">
          <a v-if="politician.socials.facebook" target="_blank" :href="`https://facebook.com/${politician.socials.facebook}`"><img class="cursor-pointer inline-block h-4 mr-6" src="@/assets/img/facebook-gray.svg"/></a>
          <a v-if="politician.socials.twitter" target="_blank" :href="`https://twitter.com/${politician.socials.twitter}`"><img class="cursor-pointer inline-block h-4 mr-6" src="@/assets/img/twitter-gray.svg"/></a>
          <a v-if="politician.socials.instagram" target="_blank" :href="`https://instagram.com/${politician.socials.instagram}`"><img class="cursor-pointer inline-block h-4" src="@/assets/img/instagram-gray.svg"/></a>
        </div>
        <div class="hidden md:flex flex-wrap" v-if="politician.socials.twitter">
          <div class="w-full border-b-1 border-gray-400">
            <div class="timeline-wrapper">
              <twitter>
                <div slot="loading">loading .....</div>
                <a class="twitter-timeline" :href="`https://twitter.com/${politician.socials.twitter}?ref_src=twsrc%5Etfw`"></a>
              </twitter>
            </div>
          </div>
        </div>
      </div>
      <div ref="main" id="main" class="bg-white right-section pl-2 md:pl-10 md:pr-17 pb-3 md:pb-4 md:max-h-screen md:overflow-y-scroll relative">
        <div class="hidden md:flex justify-between align-top" v-if="!loading">
          <div class="mt-12 w-full flex justify-between items-center">
            <span class="inline-block pr-2 text-6xl">{{politician.name}}</span>
            <our-politician-subscription :politician="politician" :subscribeText="`Subscribe to ${lastName}`"></our-politician-subscription>
          </div>
        </div>
        <div>
          <div class="hidden md:block pr-2 w-full mb-4">
            <div id="votes" class="inline-block pr-5 border-r-2 border-gray-300">
              <img class="inline-block mr-1 md:mr-2 h-3 md:h-4 cursor-pointer"
                :src="hasVoted && isUpvote ? require('@/assets/img/thumbs-up-active.svg') : require('@/assets/img/thumbs-up.svg')"
                @click="voteForPolitician(true)"/>
              <span class="inline-block mr-2 md:mr-4 h-3 md:h-4 align-middle text-xs md:text-sm">{{politician.vote.up}}</span>
              <img class="inline-block mr-1 mt-2 md:mr-2 h-3 md:h-4 cursor-pointer"
                :src="hasVoted && !isUpvote ? require('@/assets/img/thumbs-down-active.svg') : require('@/assets/img/thumbs-down.svg')"
                @click="voteForPolitician(false)"/>
              <span class="inline-block mr-1 md:mr-2 h-3 md:h-4 align-middle text-xs md:text-sm">{{politician.vote.down}}</span>
            </div>
            <div id="share" class="inline-block pl-5">
              <span class="text-xs mr-6">Share Profile</span>
                <a v-if="politician.socials.facebook" class="relative" target="_blank" :href="`https://facebook.com/${politician.socials.facebook}`">
                  <div class="absolute opacity-0 h-full w-full top-0 left-0">
                    <ShareFacebook title="Politician Test" :url="`https://ourleaders.africa/politicians/${politician.socials.facebook}`"></ShareFacebook>
                  </div>
                  <img class="cursor-pointer inline-block h-4 mr-6" src="@/assets/img/facebook-gray.svg"/>
                </a>
                <a v-if="politician.socials.twitter" class="relative" href="#">
                  <div class="absolute opacity-0 h-full w-full top-0 left-0">
                    <ShareTwitter :title="`Click to read more about ${politician.name}`" :url="`https://ourleaders.africa/politicians/${politician.socials.twitter}`"></ShareTwitter>
                  </div>
                  <img class="cursor-pointer inline-block h-4 mr-6" src="@/assets/img/twitter-gray.svg"/>
                </a>
            </div>
          </div>
          <div class="hidden md:block pr-2 w-full" v-if="position.inOffice">
            <span class="block text-base capitalize">{{position.name}}</span>
            <span class="block text-base">{{position.duration}}</span>
          </div>
          <div class="hidden md:block pr-2 w-full" v-else>
            <span class="block text-base capitalize">Not in Office</span>
          </div>
          <div class="flex flex-wrap lg:flex-row xl:flex-row">
            <div ref="mainHolder" id="main-holder" class="w-full lg:w-10/12 align-top block min-h-screen overflow-visible lg:inline-block xl:inline-block relative">
              <div ref="secondaryTab" id="secondary-tab">
                <div class="w-full mt-6 overflow-x-scroll md:pr-4">
                  <our-tabs class="mb-1 pr-2" v-on:change="setPage" :tabs='mainTabs' :tab-type="'secondary'"></our-tabs>
                </div>
                <div class="side-scroll w-full lg:w-3/12 block md:inline-block relative md:absolute">
                  <!-- For Now -->
                  <our-side-scroll :options="sideTabs" v-on:scroll="scrollTo" :currentSection="scrollSection"></our-side-scroll>
                </div>
              </div>
              <transition-group name="fade" mode="out-in">

                <!-- Background -->
                <div class="relative top-0 left-0 w-full h-full" key="background" v-show="isPage('background')">
                  <div class="w-full py-3 pr-2">
                    <div id="scroll_personalBackground">
                      <h3 class="font-bold mb-3 text-xl">Personal background</h3>
                      <div class="flex flex-wrap mb-4">
                        <span class="w-1/3 my-1 inline-block">Political Party</span>
                        <span class="w-2/3 my-1 inline-block">{{politician.politicalParty.name}}</span>
                        <span class="w-1/3 my-1 inline-block">DOB (Age)</span>
                        <span class="w-2/3 my-1 inline-block">{{getBirthString(politician.dob)}}</span>
                        <span class="w-1/3 my-1 inline-block">State of origin</span>
                        <span class="w-2/3 my-1 inline-block">{{politician.stateOfOrigin}}</span>
                      </div>
                    </div>

                    <div id="scroll_politicalBackground">
                      <h3 class="font-bold mb-3 text-xl">Political background</h3>
                      <div v-if="politician.politicalBackground.length === 0" class="mb-4">
                        <span>No current political background.</span>
                      </div>
                      <div class="flex flex-wrap mb-4" v-for="(pBackground, index) of politician.politicalBackground" :key="`pBackground_${index}`">
                        <span class="w-1/3 my-1 inline-block capitalize">{{pBackground.position}}</span>
                        <span class="w-2/3 my-1 inline-block">
                          <span class="block capitalize">{{pBackground.description}}</span>
                          <span class="block">{{getPeriodString(pBackground.startDate, pBackground.endDate, true)}}</span>
                        </span>
                      </div>
                    </div>

                    <div id="scroll_educationalBackground">
                      <h3 class="font-bold mb-3 text-xl">Educational background</h3>
                      <div v-if="politician.educationalBackground.length === 0" class="mb-4">
                        <span>No current educational background.</span>
                      </div>
                      <div class="flex flex-wrap mb-4" v-for="(eduBackground, index) of politician.educationalBackground" :key="`eduBackground_${index}`">
                        <span class="w-1/3 my-1 inline-block capitalize">{{eduBackground.degree}}</span>
                        <span class="w-2/3 my-1 inline-block">
                          <span class="capitalize">{{`${eduBackground.institution}. ${getPeriodString(eduBackground.graduationYear)}`}}</span>
                        </span>
                      </div>
                    </div>

                    <div id="scroll_professionalBackground">
                      <h3 class="font-bold mb-3 text-xl">Professional background</h3>
                      <div v-if="politician.professionalBackground.length === 0" class="mb-4">
                        <span>No current professional background.</span>
                      </div>
                      <div class="flex flex-wrap mb-4" v-for="(proBackground, index) of politician.professionalBackground" :key="`proBackground_${index}`">
                        <span class="w-1/3 my-1 inline-block capitalize">{{proBackground.title}}</span>
                        <span class="w-2/3 my-1 inline-block">
                          <span class="block capitalize">{{proBackground.description}}</span>
                          <span class="block">{{getPeriodString(proBackground.startYear, proBackground.endYear, true)}}</span>
                        </span>
                      </div>
                    </div>

                    <div class="block md:hidden w-full border-t-2 border-gray-200 mb-4 pt-10" v-if="politician.socials.twitter">
                      <div class="w-full border-b-1 border-gray-400">
                        <!-- <span class="text-2xl mr-2">Tweets</span>
                        <span class="text-base mr-1">by</span>
                        <span class="cursor-pointer twitter-link text-base">{{twitterHandle}}</span>
                        <button class="float-right align-middle font-semibold twitter-button px-2 rounded-full">Follow</button> -->

                        <!-- Twitter -->
                        <div class="timeline-wrapper">
                          <twitter>
                            <div slot="loading">loading .....</div>
                            <a class="twitter-timeline" :href="`https://twitter.com/${politician.socials.twitter}?ref_src=twsrc%5Etfw`"></a>
                          </twitter>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Accomplishments -->
                <div class="relative top-0 left-0"  key="accomplishments" v-show="isPage('accomplishments')">
                  <div v-if="politician.accomplishments.length === 0" class="text-center my-6">
                    <span>No current accomplishments background.</span>
                  </div>
                  <our-quarterly-view v-else :data="quarterData" :keys="sideTabs" @setSideTabs="setSideTabs"></our-quarterly-view>
                </div>

                <!-- Manifesto -->
                <div class="relative top-0 left-0"  key="manifesto" v-show="isPage('manifesto')">
                  <h3 class="font-bold my-3 text-xl" v-if="politician.manifesto.summary">Manifesto</h3>
                  <div class="mb-6" v-if="politician.manifesto.summary" v-html="politician.manifesto.summary"></div>
                  <div class="w-full text-center mt-4 mb-8" v-else>
                    <span>Sorry, there are no politicians matching your search.</span>
                  </div>
                  <div v-if="politician.manifesto.url">
                    <a target="_blank" :href="politician.manifesto.url" class="text-xs block text-gray-500">View full manifesto</a>
                  </div>
                </div>

                <!-- Recent Updates -->
                <div class="relative top-0 left-0"  key="recent" v-show="isPage('recent')">
                  <div v-if="feeds.length === 0" class="text-center my-6">
                    <span>No recent updates.</span>
                  </div>
                  <our-feeds :data="feedsData" :keys="feedsKeys"></our-feeds>
                </div>

                <!-- <div class="absolute top-0 left-0" v-for="tab of mainTabs" :key="tab.value" v-show="isPage(tab.value)">{{tab.label + ' is here'}}</div> -->
              </transition-group>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import moment from 'moment';
import stickybits from 'stickybits';

import { feedsMock, politiciansMock } from '@/constants/examples';
import monthsList from '@/assets/json/months.json';
import DataUtil from '@/helpers/dataUtil';
import DateUtil from '@/helpers/dateUtil';
import StringUtil from '@/helpers/stringUtil';
import tabsList from '@/assets/json/tabsList.json';
import ValidatorUtil from '@/helpers/validatorUtil';

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
      this.getUpdates(this.politicianId);
      if (this.isLoggedIn) {
        this.checkSubscriptions();
      }
    } else if (this.$router.history.current.name === 'coming-soon') {
      this.loadMockPolitician();
    } else {
      this.$router.back();
    }
  },
  mounted() {
    stickybits(this.$refs.secondaryTab);
    this.$refs.main.addEventListener('scroll', this.handleScroll, { passive: true });
  },
  unmounted() {
    this.$refs.main.removeEventListener('scroll', this.handleScroll);
  },
  computed: {
    ...mapGetters([
      'isLoggedIn',
      'subscription',
      'user',
      'viewedPoliticians',
    ]),
    feedsData() {
      return ValidatorUtil.isDefined(this.feeds) && this.page === 'recent' ? this.parseUpdates(this.feeds) : {};
    },
    firstName() {
      return this.politician.name.split(' ')[0];
    },
    hasSubscribed() {
      return this.subscribed === true;
    },
    hasVoted() {
      return ValidatorUtil.isDefined(this.politician.voters) ? (this.politician.voters.findIndex(x => x.id === this.user.id) > -1) : false;
    },
    lastName() {
      return ValidatorUtil.isDefined(this.politician.name) ? this.politician.name.split(' ')[1] : '';
    },
    position() {
      const background = this.politician.politicalBackground.find(x => x.inOffice);
      if (!background) {
        return { inOffice: false };
      }

      const duration = this.getPeriodString(background.startDate, background.endDate, false);
      return { name: StringUtil.getPoliticalPosition(background), duration, inOffice: true };
    },
    quarterData() {
      return ValidatorUtil.isDefined(this.politician) && this.page === 'accomplishments' ? this.parseQuarterlyData(this.politician.accomplishments) : {};
    },
    twitterHandle() {
      return /^@+\w+/.test(this.politician.socials.twitter) ? this.politician.socials.twitter : `@${this.politician.socials.twitter}`;
    },
  },
  data() {
    return {
      feeds: [],
      feedsKeys: [],
      feedsServices: this.$serviceFactory.feeds,
      isUpvote: false,
      loading: true,
      mainTabs: tabsList.politician,
      options: {
        container: '#main',
        duration: 2000,
        easing: 'ease',
        offset: -90,
        force: true,
        cancelable: true,
        onDone: (el) => {
          const id = el.id.split('scroll_')[1];
          this.scrollSection = id;
        },
      },
      page: 'background',
      scrollSection: '',
      politician: {
        accomplishments: [],
        educationalBackground: [],
        manifesto: {},
        professionalBackground: [],
        politicalBackground: [],
        politicalParty: {},
        socials: {},
        vote: {},
      },
      politiciansServices: this.$serviceFactory.politicians,
      previousTabs: null,
      processing: false,
      sideTabs: tabsList.politician[0].side,
      stuck: false,
      subscribed: false,
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
          type: 'feeds',
        });
        this.subscribed = true;
        this.$store.commit('setSubscription', response.data.subscription);
        this.processing = false;
      } catch (error) {
        this.subscribed = false;
        this.processing = false;
        if (!this.isLoggedIn) {
          this.$store.dispatch('displaySignUp');
        } else {
          this.displayError(error);
        }
      }
    },
    async checkSubscriptions() {
      try {
        this.processing = true;
        const response = await this.subscriptionsServices.checkSubscription(this.politicianId);
        this.subscribed = true;
        this.$store.commit('setSubscription', response.data.subscription);
        this.processing = false;
      } catch (error) {
        this.subscribed = false;
        this.processing = false;
      }
    },
    async getUpdates(id) {
      try {
        const response = await this.feedsServices.getUpdates(id);
        this.feeds = response.data.feeds;
      } catch (error) {
        this.loading = false;
      }
    },
    async getPolitician(id) {
      try {
        this.loading = true;
        const response = await this.politiciansServices.getPolitician(id);
        this.politician = response.data.politician;
        this.$store.commit('addToViewedPoliticians', this.politician);
        if (!this.politician.politicalParty) {
          this.politician.politicalParty = {};
        }
        if (ValidatorUtil.isDefined(this.politician.voters)) {
          const vote = this.politician.voters.find(x => x.id === this.user.id);
          this.isUpvote = vote ? vote.isUpvote : false;
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
        await this.subscriptionsServices.removeSubscription(this.subscription.id);
        this.subscribed = false;
        this.processing = false;
      } catch (error) {
        this.subscribed = false;
        this.processing = false;
        this.displayError(error);
      }
    },
    async voteForPolitician(isUpvote) {
      try {
        this.processing = true;
        const response = await this.politiciansServices.voteForPolitician(this.politicianId, { isUpvote });
        this.politician = response.data.politician;
        this.$store.commit('addToViewedPoliticians', this.politician);
        this.isUpvote = isUpvote;
        this.processing = false;
      } catch (error) {
        this.processing = false;
      }
    },
    getBirthString(dob) {
      const dobDate = new Date(dob);
      return `${dobDate.toLocaleDateString()} (${DateUtil.getAge(dob)})`;
    },
    getPeriodString(startDate, endDate, long) {
      if (!startDate) {
        return '';
      }

      if (!endDate) {
        return startDate;
      }

      if (typeof startDate === 'string' && typeof endDate === 'string') {
        return DateUtil.getPeriodString(startDate, endDate, long);
      }

      return `${startDate} - ${endDate}`;
    },
    handleScroll() {
      if (this.$refs.mainHolder) {
        const { top } = this.$refs.mainHolder.getBoundingClientRect();
        const shouldStick = top < 60;
        if (this.stuck !== shouldStick) {
          this.stuck = shouldStick;
        }

        // control side scroll according to where section is
        this.sideTabs.forEach((tab) => {
          const tabSectionId = tab.value;
          const section = document.getElementById(`scroll_${tabSectionId}`);
          if (section) {
            const { top: sectionTop, height: sectionHeight } = section.getBoundingClientRect();
            const { top: secondaryTabTop, height: secondaryTabHeight } = this.$refs.secondaryTab.getBoundingClientRect();
            const scrollPos = secondaryTabTop + secondaryTabHeight;
            if (sectionTop <= scrollPos && sectionTop > scrollPos - sectionHeight && this.scrollSection !== tab.value) {
              this.scrollSection = tab.value;
            }
          }
        });
      }
    },
    isPage(page) {
      return this.page === page;
    },
    loadMockPolitician() {
      this.politician = politiciansMock.pop();
      if (!this.politician.politicalParty) {
        this.politician.politicalParty = {};
      }
      this.feeds = feedsMock;
      this.loading = false;
    },
    parseQuarterlyData(data) {
      const parsedData = {};
      const keys = [];

      data.forEach((x) => {
        const year = moment(x.date).year();

        if (keys.findIndex(z => z.label === year) === -1) {
          keys.push({ label: year, value: `year_${year}` });
        }

        if (!parsedData[year]) {
          parsedData[year] = {};
        }

        if (!parsedData[year][x.quarter]) {
          parsedData[year][x.quarter] = [];
        }
        parsedData[year][x.quarter].push(x);
      });

      this.sideTabs = DataUtil.sortArray(keys, true, 'label');

      return parsedData;
    },
    parseUpdates(data) {
      const keys = [];
      const parsedData = {};

      data.forEach((x) => {
        const tempDate = new Date(x.publishedAt);
        const fullYear = tempDate.getFullYear();
        const month = tempDate.getMonth();

        if (!parsedData[fullYear]) {
          parsedData[fullYear] = {};
        }

        if (parsedData[fullYear][month]) {
          parsedData[fullYear][month].push(x);
        } else {
          parsedData[fullYear][month] = [x];
          keys.push({
            label: `${monthsList[month]} ${fullYear}`,
            value: `feeds_${month}${fullYear}`,
          });
        }
      });

      this.sideTabs = DataUtil.sortArray(keys, true, 'value');

      Object.keys(parsedData).forEach((year) => {
        const tempMonths = [];
        Object.keys(parsedData[year]).forEach((month) => {
          tempMonths.push(month);
        });
        this.feedsKeys.push({ year, months: DataUtil.sortArray(tempMonths, true) });
      });

      return parsedData;
    },
    scrollTo(id) {
      this.$scrollTo(`#${id}`, 2000, this.options);
    },
    setPage(page, index) {
      this.page = page;
      this.sideTabs = tabsList.politician[index].side;
    },
    setSideTabs(sideTabs) {
      if (sideTabs) {
        this.previousTabs = this.sideTabs;
        this.sideTabs = sideTabs;
      } else {
        this.sideTabs = this.previousTabs;
      }
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
  #secondary-tab {
    background: white;
    z-index: 30;
  }

  .left-section {
    width: 100%;

    @screen md {
      width: 32.5rem;
      min-height: 100%;
    }
  }

  .right-section {
    width: 100%;

    @screen md {
      height: calc(100vh - 60px);
      margin-left: 32.5rem;
      width: calc(100% - 32.5rem);
    }
  }

  .subscribe-btn {
    right: 4.25rem;
    z-index: 40;
  }

  .side-scroll {
    margin-top: 2rem;
    right: -25%;
  }
</style>
