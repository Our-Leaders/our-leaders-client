<template>
  <div class="pr-64">
    <h3 class="text-4xl mb-8">Basic Information</h3>
    <div class="flex mb-6">
      <div class="w-1/2">
        <p class="mb-4">
          <span class="text-base font-bold mr-16">Name</span>
          <span class="text-base">{{`${this.user.firstName} ${this.user.lastName}`}}</span>
        </p>
        <p>
          <span class="text-base font-bold mr-16">Email</span>
          <span class="text-base inline-block align-top">
            {{this.user.email}}
            <Small class="text-xs text-gray-600 block break mt-2">Signed in via Email</Small>
          </span>
        </p>
      </div>
      <div class="w-1/2">
        <div class="avatar float-right">
          <img src="@/assets/img/no-image.svg"/>
          <!-- Will work on this in another card -->
          <div class="avatar-hover">
            <button class="text-white mx-auto border-2 border-gray-500 w-16 px-4">Edit</button>
          </div>
        </div>
      </div>
    </div>
    <hr/>

    <!-- Connections -->
    <div class="flex flex-wrap mt-5 mb-6">
      <div class="w-full relative mb-8">
        <h3 class="text-xl mb-5 font-bold">Connections</h3>
        <p class="w-1/2">
          <span class="block text-base font-bold mb-3">Facebook</span>
          <span class="block text-sm">
            This makes sharing alot easier. We will never post anything without your permission.
          </span>
        </p>
        <!-- Will work on this in another card -->
        <button class="btn-grey-outline py-1 px-2 absolute top-0 right-0 mt-16">
          <img class="h-5 w-5 inline-block mr-2" src="@/assets/img/facebook-color.svg"/>
          <span class="text-sm align-middle">Connect Facebook</span>
        </button>
      </div>
      <div class="w-full relative">
        <p class="w-1/2">
          <span class="block text-base font-bold mb-3">Twitter</span>
          <span class="block text-sm">
            This makes sharing alot easier. We will never post anything without your permission.
          </span>
        </p>
        <!-- Will work on this in another card -->
        <button class="btn-grey-outline py-1 px-2 absolute top-0 right-0 mt-1">
          <img class="h-5 w-5 inline-block mr-2" src="@/assets/img/twitter-color.svg"/>
          <span class="text-sm align-middle">Connect Twitter</span>
        </button>
      </div>
    </div>
    <hr/>

    <!-- Account -->
    <div class="flex flex-wrap mt-5 mb-6">
      <h3 class="block w-full text-xl mb-5 font-bold">Account</h3>
      <div class="w-1/2">
        <button class="btn-grey-outline w-full py-1" @click="signOut">
          Sign Out
        </button>
      </div>
      <div class="w-1/2">
        <button class="w-full py-1">
          Delete Account
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'basic-information',
  computed: {
    ...mapGetters([
      'user',
    ]),
  },
  methods: {
    signOut() {
      this.$store.commit('clearCurrentUser');
      this.$store.commit('clearJWT');
      this.$router.push('home');
    },
  },
};
</script>

<style lang="scss">
  .avatar {
    border-radius: 60px;
    display: block;
    height: 120px;
    overflow: hidden;
    position: relative;
    width: 120px;

    .avatar-hover {
      background-color: #000000;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: center;
      left: 0;
      opacity: 0;
      position: absolute;
      top: 0;
      transition-delay: 100ms;
      transition-duration: 300ms;
      transition-property: opacity;
      transition-timing-function: ease-in-out;
      width: 100%;

      &:hover {
        opacity: .8;
      }
    }
  }
</style>
