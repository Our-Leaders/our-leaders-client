<template>
  <div class="min-h-screen overflow-hidden">
    <!-- Header -->
    <div class="flex flex-wrap flex-col-reverse lg:flex-row xl:flex-row px-8 md:px-32">
      <div class="w-full lg:w-1/2 mt-56 md:mt-64 lg:mt-0 xl:mt-0 xl:w-1/2 py-24">
        <h3 class="hidden md:block text-6xl mb-6">Work With Us</h3>
        <span class="leading-loose">
          Are you interested in joining a vibrant team, working towards an audacious &amp; impactful goal? Then apply below.
        </span>
      </div>
      <div class="w-full lg:w-1/2 xl:w-1/2 relative">
        <h3 class="md:hidden text-6xl mb-6">Careers</h3>
        <img class="career-1 absolute top-0 left-0 md:right-0 md:mx-auto mt-32 md:mt-16" src="@/assets/img/career1.png"/>
        <img class="career-2 absolute top-0 right-0 md:left-0 md:mx-auto mt-32 md:mt-8" src="@/assets/img/career2.png"/>
      </div>
    </div>

    <!-- Body -->
    <div class="flex flex-wrap flex-col-reverse lg:flex-row xl:flex-row px-8 md:px-32 mb-64">
      <div class="w-full lg:w-2/3 xl:w-2/3">
        <h3 class="text-4xl mb-6" ref="opening">Current Openings</h3>
        <div class="flex flex-wrap mb-8 lg:mb-12 xl:mb-12" v-for="(category, i) in categories" :key="i">
          <h3 class="w-full font-circular font-bold text-2xl capitalize mb-1">{{category}}</h3>
          <div class="w-full md:w-1/2 lg:w-1/3 xl:w-1/3 jobs mb-8" v-for="(job, index) in jobs[category]" :key="index">
            <div class="image-holder cursor-pointer" @click="setJob(category, index, job)">
              <img v-if="job.image" :src="job.image.url"/>
              <img v-else src="@/assets/img/career2.png"/>
            </div>
            <h3 class="text-xl font-circular font-bold cursor-pointer mb-1" @click="setJob(category, index, job)">{{job.title}}</h3>
            <span class="capitalize mr-4 cursor-pointer" @click="setJob(category, index, job)">{{job.location}}</span>
            <span class="inline-block md:inline font-circular cursor-pointer capitalize text-xs border border-nav py-1 px-2" @click="setJob(category, index, job)">{{getDisplayType(job.type)}}</span>
            <transition-group name="fade">
              <div class="z-20 secondary-tab text-center relative mt-6 lg:mt-3 xl:mt-3 px-4 md:px-0" v-if="isSelected(category, index)"  key="job-triangle">
                <span class="bottom-triangle"></span>
              </div>
              <div class="z-10 w-11/12 mx-auto lg:w-job xl:w-job bg-white absolute left-0 right-0 md:mr-0 md:ml-32 py-8 px-4 md:px-0 border-t border-primary"
                v-if="isSelected(category, index)" key="job-body">
                <img class="float-right h-6 w-6 cursor-pointer" @click="clearJob" src="@/assets/img/close.svg"/>
                <p class="mb-5">
                  <span class="text-lg font-circular font-bold mr-4">{{current.job.title}}</span>
                  <span class="inline-block md:inline font-circular capitalize text-xs border border-nav py-1 px-2">{{getDisplayType(current.job.type)}}</span>
                  <span class="block capitalize mr-4">{{current.job.location}}</span>
                </p>
                <p class="mb-5">
                  {{current.job.description}}
                </p>
                <button class="bg-primary text-white leading py-1 px-8" @click="apply">Apply</button>
              </div>
            </transition-group>
          </div>
        </div>
        <div class="flex mb-4">
          <div class="w-full" v-if="loading">
            <span class="loading lg mx-auto"></span>
          </div>
        </div>
        <div class="w-full text-center mt-4 mb-8" v-if="noMatch">
          <span>Sorry, there are no jobs matching your search.</span>
        </div>
      </div>
      <div class="w-full lg:w-1/3 xl:w-1/3 pl-0 lg:pl-6 xl:pl-6 relative">
        <div class="lg:flex xl:flex flex-wrap mt-3">
          <div class="w-9/12 inline-block">
              <input class="field w-full mt-1 py-2 pl-2"
                :class="{ 'inactive': isEmpty(filters.query) }"
                type="text"
                id="query"
                name="query"
                placeholder="Job title"
                v-model="filters.query"/>
          </div>
          <div class="w-3/12 inline-block pl-4">
            <button
              class="btn-grey-outline py-2 lg:py-0 xl:py-0 w-full h-full"
              :disabled="loading || isEmpty(filters.query)"
              @click="getCareers">
              Search
            </button>
          </div>
          <div class="w-full my-10">
            <div class="w-full horizontal-divide">
              <span>Or search by</span>
            </div>
          </div>
          <div class="w-full mb-5 relative">
            <our-labels :options="labels" @changed="setFilter"></our-labels>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import labels from '../../assets/json/jobTypes.json';
import ValidatorUtil from '../../helpers/validatorUtil';

export default {
  name: 'careers',
  created() {
    this.getCareers();
  },
  data() {
    return {
      careersServices: this.$serviceFactory.careers,
      categories: [],
      current: {
        category: null,
        index: null,
        job: null,
      },
      filters: {
        query: null,
        type: null,
      },
      testing: 0,
      jobs: [],
      labels: labels.types,
      loading: true,
    };
  },
  computed: {
    noMatch() {
      return !this.loading && this.categories.length === 0;
    },
  },
  methods: {
    ...mapActions([
      'displayError',
    ]),
    async getCareers() {
      try {
        this.loading = true;
        this.categories = [];
        this.jobs = [];

        const response = await this.careersServices.getJobs(this.filters);
        this.categories = Object.keys(response.data.jobs);
        this.jobs = response.data.jobs;
        this.$store.commit('setJobs', response.data.jobs);
        this.$nextTick(() => {
          this.$refs.opening.focus();
        });

        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.displayError(error);
      }
    },
    apply() {
      this.$store.commit('setJob', this.current.job);
      this.$router.push('/careers/apply');
    },
    clearJob() {
      this.current = {
        category: null,
        index: null,
        job: null,
      };
    },
    getDisplayType(value) {
      const index = this.labels.findIndex(x => x.value === value);
      return this.labels[index].label;
    },
    isEmpty(value) {
      return !ValidatorUtil.isDefined(value);
    },
    isSelected(category, index) {
      return this.current.category === category && this.current.index === index;
    },
    setFilter(value) {
      this.filters.type = value;
      this.getCareers();
    },
    setJob(category, index, job) {
      this.current.category = category;
      this.current.index = index;
      this.current.job = job;
    },
  },
};
</script>

<style lang="scss">
.career-1 {
  height: 256px;

  @screen md {
    height: 300px;
    transform: translateX(-45%);
  }
}

.career-2 {
  transform: translateX(55%);

  @screen md {
    transform: translateX(45%);
  }
}

.jobs {
  padding-right: 16px;

  .image-holder {
    height: 160px;
    margin-bottom: 12px;
    object-fit: cover;
    overflow: hidden;

    img {
      width: 100%;
    }
  }
}
</style>
