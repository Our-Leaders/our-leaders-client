<template>
  <div class="pr-10 lg:pr-64 xl:pr-64">
    <h3 class="text-4xl mb-8">Votes</h3>

    <div class="flex flex-col justify-center mt-8" v-if="loading">
      <div class="w-full text-center">
        <span class="loading lg mx-auto mb-2"></span>
        <span>Loading Votes...</span>
      </div>
    </div>

    <div v-if="!loading">
      <div class="flex flex-wrap flex-col lg:flex-row xl:flex-row border-b-2 border-gray-200 mb-4 pb-2 xl:mb-0 xl:pb-0"
        v-for="(politician, index) in votes" :key="index">
        <div class="w-full lg:w-1/3 xl:w-1/3 my-1 lg:my-4 xl:my-4 pr-3 overflow-ellipse">
          <span class="font-bold">{{politician.name}}</span>
        </div>
        <div class="w-full lg:w-1/3 xl:w-1/3 my-1 lg:my-4 xl:my-4 pr-3 overflow-ellipse">
          <span>{{politician.position}}</span>
        </div>
        <div class="w-full lg:w-1/3 xl:w-1/3 my-1 lg:my-4 xl:my-4 pr-3 lg:text-right xl:text-right">
          <button class="vote-btn inline-block outline-none" @click="voteForPolitician(index, true)" :disabled="processing"><img class="mr-1 md:mr-2 h-4 md:h-4" :src="getUpvoteImage(politician)"/></button>
          <span class="inline-block align-baseline mr-2 md:mr-4 h-4 md:h-4 text-xs md:text-sm">{{politician.vote.up}}</span>
          <button class="vote-btn inline-block outline-none" @click="voteForPolitician(index, false)" :disabled="processing"><img class="mr-1 md:mr-2 h-4 md:h-4 thumb-down" :src="getDownvoteImage(politician)"/></button>
          <span class="inline-block align-baseline mr-1 md:mr-2 h-4 md:h-4 text-xs md:text-sm">{{politician.vote.down}}</span>
        </div>
      </div>
    </div>

    <div class="w-full text-center my-4" v-if="isEmpty">
      <span>You have currently voted for no politician.</span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'manage-votes',
  created() {
    this.getVotes();
  },
  computed: {
    ...mapGetters([
      'user',
    ]),
    isEmpty() {
      return !this.loading && this.votes.length === 0;
    },
  },
  data() {
    return {
      loading: true,
      politiciansServices: this.$serviceFactory.politicians,
      processing: false,
      usersServices: this.$serviceFactory.users,
      votes: [],
    };
  },
  methods: {
    ...mapActions([
      'displayError',
      'displaySuccess',
    ]),
    async getVotes() {
      try {
        this.loading = true;
        const response = await this.usersServices.getVotes(this.user.id);

        this.votes = response.data.votes;
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.displayError(error);
      }
    },
    async voteForPolitician(position, isUpvote) {
      try {
        this.processing = true;
        await this.politiciansServices.voteForPolitician(this.votes[position].politicianId, { isUpvote });

        this.votes[position].voted.isUpvote = isUpvote;
        this.processing = false;
        this.displaySuccess({ message: 'Vote Successfully Saved.' });
      } catch (error) {
        this.processing = false;
        this.displayError(error);
      }
    },
    getDownvoteImage(politician) {
      const images = require.context('../../../assets/img/', false, /\.svg$/);
      return !politician.voted.isUpvote ? images('./thumbs-down-active.svg') : images('./thumbs-down.svg');
    },
    getUpvoteImage(politician) {
      const images = require.context('../../../assets/img/', false, /\.svg$/);
      return politician.voted.isUpvote ? images('./thumbs-up-active.svg') : images('./thumbs-up.svg');
    },
  },
};
</script>

<style lang="scss">
</style>
