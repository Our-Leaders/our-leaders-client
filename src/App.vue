<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <!-- Sign Up/Login Modal -->
      <our-modal :show="info.displaySignUp" v-on:dismiss="closeModal">
        <template v-slot:header>
          <div v-if="header === 'signup'">
            <h5 class="font-bold text-xl">Sign up to continue</h5>
            <p class="my-3">
              Create your account to gain full access to the platform
            </p>
          </div>
          <div v-else>
            <h5 class="font-bold text-xl">Sign in to continue</h5>
            <p class="my-3">
              Sign into your account to gain full access to the platform
            </p>
          </div>
        </template>
        <template v-slot:body>
          <our-auth v-on:toggle="toggleHeader"></our-auth>
        </template>
      </our-modal>
    </transition>
    <transition name="fade" mode="out-in">
      <!-- Alerts -->
      <our-alert :alert-type="info.type" :display="info.display">
        <p class="font-bold">{{info.header}}</p>
        <p class="text-sm">{{info.details}}</p>
      </our-alert>
    </transition>
    <transition name="fade" mode="out-in">
      <component :is="layout">
        <router-view/>
      </component>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ValidatorUtil from './helpers/validatorUtil';

export default {
  name: 'App',
  data() {
    return {
      header: 'signin',
    };
  },
  computed: {
    ...mapState([
      'info',
    ]),
    layout() {
      if (this.$route.matched.length > 1) {
        const index = this.$route.matched.findIndex(x => ValidatorUtil.isDefined(x.meta.layout));
        if (index > -1) {
          return `${this.$route.matched[index].meta.layout}-layout`;
        }
      }

      return `${this.$route.meta.layout || 'default'}-layout`;
    },
  },
  methods: {
    closeModal() {
      this.$store.commit('hideSignUp');
    },
    toggleHeader(header) {
      this.header = header;
    },
  },
};
</script>

<style lang="scss">
</style>
