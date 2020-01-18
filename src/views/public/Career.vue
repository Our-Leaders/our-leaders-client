<template>
  <div class="flex min-h-screen">
    <div class="w-1/2 mx-auto py-10">
      <h3 class="text-4xl mb-3">
        {{data.title}}
      </h3>
      <span class="capitalize mr-4 cursor-pointer">{{data.location}}</span>
      <span class="inline font-circular cursor-pointer capitalize text-xs border border-nav px-1">{{getDisplayType(data.type)}}</span>
      <our-tabs class="mb-6" v-on:change="setSecondary" :tabs='secondaryTabs' :tab-type="'secondary'"></our-tabs>
      <div class="w-full" v-if="loading">
        <span class="loading lg mx-auto"></span>
      </div>
      <transition-group name="fade" mode="out-in" v-if="!loading">
        <div class="w-full" key="job-overview" v-if="page === 'overview'">
          {{data.description}}
        </div>
        <div class="w-full" key="job-application" v-else>
          <form @submit.prevent="proceed" class="flex flex-wrap">
            <span class="w-full capitalize mr-4 font-circular cursor-pointer text-xl font-bold mb-4">Personal Information</span>
            <div class="w-1/2 mb-6 pr-4">
              <label class="block" for="first">First Name</label>
              <input class="field w-full py-2"
                type="text"
                id="first"
                name="first"
                v-model="application.firstName"
                placeholder="Enter first name"
                required/>
            </div>
            <div class="w-1/2 mb-6 pl-4">
              <label class="block" for="last">Last Name</label>
              <input class="field w-full py-2"
                type="text"
                id="last"
                name="last"
                v-model="application.lastName"
                placeholder="Enter last name"
                required/>
            </div>
            <div class="w-full mb-6">
              <label class="block" for="email">Email Address</label>
              <input class="field w-full py-2"
                type="email"
                id="email"
                name="email"
                v-model="application.email"
                placeholder="Enter email"
                required/>
            </div>
            <div class="w-full mb-6">
              <label class="block" for="address">Address</label>
              <input class="field w-full py-2"
                type="text"
                id="address"
                name="address"
                v-model="application.address"
                placeholder="Enter address"
                required/>
            </div>

            <span class="w-full capitalize mr-4 font-circular cursor-pointer text-xl font-bold my-4">Credentials</span>
            <div class="w-1/2 mb-6 pr-4">
              <label class="block" for="cv">CV</label>
              <input class="field w-full py-2"
                type="text"
                id="cv"
                name="cv"
                v-model="application.cv"
                placeholder="Enter CV link"
                required/>
            </div>
            <div class="w-1/2 mb-6 pl-4">
              <label class="block" for="portfolio">Portfolio</label>
              <input class="field w-full py-2"
                type="text"
                id="portfolio"
                name="portfolio"
                v-model="application.portfolio"
                placeholder="Enter portfolio name"
                required/>
            </div>

            <span class="w-full capitalize mr-4 font-circular cursor-pointer text-xl font-bold my-4">Details</span>
            <span>Why are you interested in woring at Our Leaders Africa?</span>
            <textarea class="w-full border-b border-gray-300 resize-none outline-none py-3 mb-4"
              rows="3"
              v-model="application.interested"
              placeholder="Enter response here"
              required></textarea>
            <span>Why are the top three professional strengths would you bring to this role?</span>
            <textarea class="w-full border-b border-gray-300 resize-none outline-none py-3 mb-6"
              rows="3"
              v-model="application.strengths"
              placeholder="Enter response here"
              required></textarea>
            <button class="bg-primary text-white leading py-3 px-10 mb-10" type="submit">Submit Application</button>
          </form>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import labels from '../../assets/json/jobTypes.json';
import ValidatorUtil from '../../helpers/validatorUtil';

export default {
  name: 'career',
  created() {
    this.data = this.job();
    if (!ValidatorUtil.isDefined(this.data)) {
      this.$router.push('/careers');
    }
  },
  data() {
    return {
      ...mapGetters([
        'job',
      ]),
      application: {},
      data: null,
      labels: labels.types,
      loading: false,
      page: 'overview',
      secondaryTabs: [{ label: 'Overview', value: 'overview' }, { label: 'Application', value: 'application' }],
    };
  },
  methods: {
    ...mapActions([
      'displayError',
      'displaySuccess',
    ]),
    getDisplayType(value) {
      const index = this.labels.findIndex(x => x.value === value);
      return this.labels[index].label;
    },
    proceed() {
      // TODO: Send the application
    },
    setSecondary(value) {
      this.page = value;
    },
  },
};
</script>

<style lang="scss">
</style>
