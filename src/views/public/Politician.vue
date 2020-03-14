<template>
  <div class="relative">
    <div class="flex flex-col justify-center min-h-screen mb-4" v-if="loading">
      <div class="w-full text-center">
        <span class="loading lg mx-auto mb-2"></span>
        <span>Loading Details...</span>
      </div>
    </div>
    <div class="flex flex-wrap pb-2" v-if="!loading">
      <div class="w-full md:w-1/3 py-2 md:py-8 px-2 lg:px-16 xl:px-16 lg:border-r-2 xl:border-r-2 border-gray-200">
        <div class="md:hidden">
          <h3 class="text-5xl leading-tight mb-3">{{politician.name}}</h3>
          <div class="w-full" v-if="position.inOffice">
            <span class="block text-base capitalize">{{position.name}}</span>
            <span class="block text-base">{{position.duration}}</span>
          </div>
          <div class="w-full mb-2" v-else>
            <span class="block text-base capitalize">Not in Office</span>
          </div>
          <button class="btn-subscribe px-4 py-2 my-3"
            :class="{ 'active': hasSubscribed }"
            @click="toggleSubscription">
            <span class="align-middle loading sm" v-if="processing"></span>
            <span class="align-middle" v-if="!hasSubscribed && !processing">Subscribe to {{lastName}}</span>
            <span class="align-middle" v-if="hasSubscribed && !processing">Subscribed</span>
            <img class="ml-2" v-if="hasSubscribed && !processing" src="@/assets/img/green-tick.svg"/>
          </button>
        </div>
        <div class="passport-wrapper mb-3 md:max-w-passport">
          <img class="object-cover" :src="politician.profileImage"/>
        </div>
        <div class="flex md:hidden w-full justify-between px-3">
          <div id="votes" class="inline-block pr-5">
            <img class="inline-block mr-2 md:mr-2 h-4 md:h-4" src="@/assets/img/thumbs-up.svg"/>
            <span class="inline-block mr-3 md:mr-4 h-4 md:h-4 align-middle text-xs md:text-sm">{{politician.vote.up}}</span>
            <img class="inline-block mr-2 mt-2 md:mr-2 h-4 md:h-4" src="@/assets/img/thumbs-down.svg"/>
            <span class="inline-block mr-2 md:mr-2 h-4 md:h-4 align-middle text-xs md:text-sm">{{politician.vote.down}}</span>
          </div>
          <div id="share" class="inline-block">
            <a v-if="politician.socials.facebook" target="_blank" :href="`https://facebook.com/${politician.socials.facebook}`"><img class="cursor-pointer inline-block h-4 mr-6" src="@/assets/img/facebook-gray.svg"/></a>
            <a v-if="politician.socials.twitter" target="_blank" :href="`https://twitter.com/${politician.socials.twitter}`"><img class="cursor-pointer inline-block h-4 mr-6" src="@/assets/img/twitter-gray.svg"/></a>
            <a v-if="politician.socials.instagram" target="_blank" :href="`https://instagram.com/${politician.socials.instagram}`"><img class="cursor-pointer inline-block h-4" src="@/assets/img/instagram-gray.svg"/></a>
          </div>
        </div>
        <div class="hidden md:block mb-10">
          <a v-if="politician.socials.facebook" target="_blank" :href="`https://facebook.com/${politician.socials.facebook}`"><img class="cursor-pointer inline-block h-4 mr-6" src="@/assets/img/facebook-gray.svg"/></a>
          <a v-if="politician.socials.twitter" target="_blank" :href="`https://twitter.com/${politician.socials.twitter}`"><img class="cursor-pointer inline-block h-4 mr-6" src="@/assets/img/twitter-gray.svg"/></a>
          <a v-if="politician.socials.instagram" target="_blank" :href="`https://instagram.com/${politician.socials.instagram}`"><img class="cursor-pointer inline-block h-4" src="@/assets/img/instagram-gray.svg"/></a>
        </div>
        <div class="hidden md:flex flex-wrap" v-if="politician.socials.twitter">
          <div class="w-full border-b-1 border-gray-400">
            <!-- <span class="text-2xl mr-2">Tweets</span>
            <span class="text-base mr-1">by</span>
            <span class="cursor-pointer twitter-link text-base">{{twitterHandle}}</span>
            <button class="float-right align-middle font-semibold twitter-button px-2 rounded-full">Follow</button>
            <hr class="mt-2"/> -->
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
      <div class="w-full md:w-2/3 pl-2 md:px-10 py-1 md:py-4 md:max-h-screen md:overflow-y-scroll relative" sticky-container>
        <h3 class="hidden md:block pr-2 text-6xl mt-8">{{politician.name}}</h3>
        <button class="hidden btn-subscribe md:block absolute top-0 right-0 px-4 py-2 my-1 md:my-5 mr-17"
          :class="{ 'active': hasSubscribed }"
          @click="toggleSubscription">
          <span class="align-middle loading sm" v-if="processing"></span>
          <span class="align-middle" v-if="!hasSubscribed && !processing">Subscribe to {{lastName}}</span>
          <span class="align-middle" v-if="hasSubscribed && !processing">Subscribed</span>
          <img class="ml-2" v-if="hasSubscribed && !processing" src="@/assets/img/green-tick.svg"/>
        </button>
        <div class="hidden md:block pr-2 w-full mb-4">
          <div id="votes" class="inline-block pr-5 border-r-2 border-gray-300">
            <img class="inline-block mr-1 md:mr-2 h-3 md:h-4" src="@/assets/img/thumbs-up.svg"/>
            <span class="inline-block mr-2 md:mr-4 h-3 md:h-4 align-middle text-xs md:text-sm">{{politician.vote.up}}</span>
            <img class="inline-block mr-1 mt-2 md:mr-2 h-3 md:h-4" src="@/assets/img/thumbs-down.svg"/>
            <span class="inline-block mr-1 md:mr-2 h-3 md:h-4 align-middle text-xs md:text-sm">{{politician.vote.down}}</span>
          </div>
          <div id="share" class="inline-block pl-5">
            <span id="testing" class="cursor-pointer text-xs mr-6">Share Profile</span>
              <a v-if="politician.socials.facebook" class="relative" target="_blank" :href="`https://facebook.com/${politician.socials.facebook}`">
                <div class="absolute opacity-0 h-full w-full top-0 left-0">
                  <ShareFacebook title="Politician Test" :url="`http://example.com/politicians/${politician.socials.twitter}`"></ShareFacebook>
                </div>
                <img class="cursor-pointer inline-block h-4 mr-6" src="@/assets/img/facebook-gray.svg"/>
              </a>
              <a v-if="politician.socials.twitter" class="relative" href="#">
                <div class="absolute opacity-0 h-full w-full top-0 left-0">
                  <ShareTwitter :title="`Click to read more about ${politician.name}`" :url="`http://localhost:8080/politicians/${politician.socials.twitter}`"></ShareTwitter>
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
        <div v-sticky sticky-offset="offset" sticky-side="top" ref="stickyTop">
          <div class="w-full md:w-9/12 overflow-x-scroll mt-6 md:pr-4">
            <our-tabs class="mb-1 pr-2" v-on:change="setPage" :tabs='mainTabs' :tab-type="'secondary'"></our-tabs>
          </div>
        </div>
        <div class="flex flex-wrap lg:flex-row xl:flex-row min-h-screen">
          <div class="w-full lg:w-9/12 xl:w-9/12 align-top block min-h-screen lg:inline-block xl:inline-block relative">
            <transition-group name="fade" mode="out-in">

              <!-- Background -->
              <div class="relative top-0 left-0 w-full" key="background" v-show="isPage('background')">
                <div class="w-full py-2 pr-2">
                  <h3 class="font-bold mb-3 text-xl">Personal background</h3>
                  <div class="flex flex-wrap mb-4">
                    <span class="w-1/3 my-1 inline-block">Political Party</span>
                    <span class="w-2/3 my-1 inline-block">{{politician.politicalParty.name}}</span>
                    <span class="w-1/3 my-1 inline-block">DOB (Age)</span>
                    <span class="w-2/3 my-1 inline-block">{{getBirthString(politician.dob)}}</span>
                    <span class="w-1/3 my-1 inline-block">State of origin</span>
                    <span class="w-2/3 my-1 inline-block">{{politician.stateOfOrigin}}</span>
                  </div>

                  <h3 class="font-bold mb-3 text-xl">Political background</h3>
                  <div v-if="politician.politicalBackground.length === 0" class="mb-4">
                    <span>No current political background.</span>
                  </div>
                  <div class="flex flex-wrap mb-4" v-for="(pBackground, index) of politician.politicalBackground" :key="`pBackground_${index}`">
                    <span class="w-1/3 my-1 inline-block capitalize">{{pBackground.position}}</span>
                    <span class="w-2/3 my-1 inline-block">
                      <span class="block capitalize">{{pBackground.region}}</span>
                      <span class="block">{{getPeriodString(pBackground.startDate, pBackground.endDate)}}</span>
                    </span>
                  </div>

                  <h3 class="font-bold mb-3 text-xl">Educational background</h3>
                  <div v-if="politician.educationalBackground.length === 0" class="mb-4">
                    <span>No current educational background.</span>
                  </div>
                  <div class="flex flex-wrap mb-4" v-for="(eduBackground, index) of politician.educationalBackground" :key="`eduBackground_${index}`">
                    <span class="w-1/3 my-1 inline-block capitalize">{{eduBackground.degree}}</span>
                    <span class="w-2/3 my-1 inline-block">
                      <span class="capitalize">{{`${eduBackground.institution}. ${(new Date(eduBackground.startDate)).getFullYear()}`}}</span>
                    </span>
                  </div>

                  <h3 class="font-bold mb-3 text-xl">Professional background</h3>
                  <div v-if="politician.professionalBackground.length === 0" class="mb-4">
                    <span>No current professional background.</span>
                  </div>
                  <div class="flex flex-wrap mb-4" v-for="(proBackground, index) of politician.professionalBackground" :key="`proBackground_${index}`">
                    <span class="w-1/3 my-1 inline-block capitalize">{{proBackground.title}}</span>
                    <span class="w-2/3 my-1 inline-block">
                      <span class="block capitalize">{{proBackground.description}}</span>
                      <span class="block">{{getPeriodString(proBackground.startDate, proBackground.endDate)}}</span>
                    </span>
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
                <our-quarterly-view :data="quarterData" :keys="sideTabs" @setSideTabs="setSideTabs"></our-quarterly-view>
              </div>

              <!-- Manifesto -->
              <div class="relative top-0 left-0"  key="manifesto" v-show="isPage('manifesto')">
                <h3 class="font-bold mb-3 text-xl">Manifesto</h3>
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
          <div class="w-full lg:w-3/12 xl:w-3/12 block md:inline-block">
            <!-- For Now -->
            <our-side-scroll :options="sideTabs" v-on:scroll="scrollTo"></our-side-scroll>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { politiciansMock } from '@/constants/examples';
import monthsList from '@/assets/json/months.json';
import tabsList from '@/assets/json/tabsList.json';
import DataUtil from '@/helpers/dataUtil';
import DateUtil from '@/helpers/dateUtil';
import StringUtil from '@/helpers/stringUtil';
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
    } else {
      this.$router.back();
    }
  },
  computed: {
    ...mapGetters([
      'isLoggedIn',
      'subscription',
      'viewedPoliticians',
    ]),
    feedsData() {
      return ValidatorUtil.isDefined(this.feeds) && this.page === 'recent' ? this.parseUpdates(this.feeds) : {};
    },
    hasSubscribed() {
      return this.subscribed === true;
    },
    lastName() {
      return ValidatorUtil.isDefined(this.politician.name) ? this.politician.name.split(' ')[1] : '';
    },
    position() {
      const background = this.politician.politicalBackground.find(x => x.inOffice);
      if (!background) {
        return { inOffice: false };
      }

      const duration = this.getPeriodString(background.startDate, background.endDate);
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
      loading: true,
      mainTabs: tabsList.politician,
      page: 'background',
      // For now
      politician: politiciansMock[0],
      politiciansServices: this.$serviceFactory.politicians,
      previousTabs: null,
      processing: false,
      sideTabs: tabsList.politician[0].side,
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
          this.politician = response.data.politician;
          this.$store.commit('addToViewedPoliticians', this.politician);
        }
        if (!this.politician.politicalParty) {
          this.politician.politicalParty = {};
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
    getBirthString(dob) {
      const dobDate = new Date(dob);
      return `${dobDate.toLocaleDateString()} (${DateUtil.getAge(dob)})`;
    },
    getPeriodString(startDate, endDate) {
      return DateUtil.getPeriodString(startDate, endDate);
    },
    isPage(page) {
      return this.page === page;
    },
    parseQuarterlyData(data) {
      const parsedData = {};
      const keys = [];

      data.forEach((x) => {
        if (keys.findIndex(z => z.label === x.year) === -1) {
          keys.push({ label: x.year, value: x.year });
        }

        if (!parsedData[x.year]) {
          parsedData[x.year] = {};
        }

        if (!parsedData[x.year][x.quarter]) {
          parsedData[x.year][x.quarter] = [];
        }
        parsedData[x.year][x.quarter].push(x);
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
            value: `feeds${month}${fullYear}`,
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
      this.$scrollTo(`#${id}`);
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
</style>
