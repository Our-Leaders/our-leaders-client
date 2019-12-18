<template>
  <div id="app">
    <our-alert :alert-type="info.type" :display="info.display">
      <p class="font-bold">{{info.header}}</p>
      <p class="text-sm">{{info.details}}</p>
    </our-alert>
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
};
</script>

<style lang="scss">
</style>
