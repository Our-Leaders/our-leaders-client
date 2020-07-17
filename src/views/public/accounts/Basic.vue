<template>
  <div class="pr-10 lg:pr-64 xl:pr-64">
    <h3 class="text-4xl mb-8">Basic Information</h3>
    <div class="flex flex-col-reverse lg:flex-row xl:flex-row flex-wrap mb-6">
      <div class="w-full lg:w-1/2 xl:w-1/2">
        <p class="mb-4">
          <span class="text-base font-bold mr-16">Name</span>
          <span class="text-base block lg:inline-block xl:inline-block">{{`${this.user.firstName || ''} ${this.user.lastName || ''}`}}</span>
          <button class="text-sm text-black border-2 border-black ml-2 hover:text-white hover:bg-black hover:border-black w-16 px-4" @click="toggleModal(3)">Edit</button>
        </p>
        <p>
          <span class="text-base font-bold mr-16">Email</span>
          <span class="text-base block lg:inline-block xl:inline-block align-top">
            {{this.user.email}}
            <Small class="text-xs text-gray-600 block break mt-2">Signed in via Email</Small>
          </span>
        </p>
      </div>
      <div class="w-full lg:w-1/2 xl:w-1/2">
        <div class="avatar mx-auto lg:mx-0 xl:mx-0 xl:float-right lg:float-right">
          <img :src="user.profileImage ? user.profileImage : require('@/assets/img/no-image.svg')"/>
          <!-- Will work on this in another card -->
          <div class="avatar-hover">
            <button class="text-white mx-auto border-2 border-gray-500 w-16 px-4" @click="toggleModal(1)">Edit</button>
          </div>
        </div>
      </div>
    </div>
    <hr/>

    <!-- Account -->
    <div class="flex flex-wrap mt-5 mb-6">
      <h3 class="block w-full text-xl mb-5 font-bold">Account</h3>
      <div class="w-full mb-4 lg:w-1/2 xl:w-1/2">
        <button class="btn-grey-outline w-full py-1" @click="signOut">
          Sign Out
        </button>
      </div>
      <div class="w-full mb-4 lg:w-1/2 xl:w-1/2">
        <button class="w-full py-1 hover:text-red-600" @click="toggleModal(2)">
          Delete Account
        </button>
      </div>
    </div>

    <our-modal :show="showModal && modalPage === 1" v-on:dismiss="toggleModal">
      <template v-slot:header>
        <h3 class="font-bold text-lg font-circular mb-6">Profile Picture Change</h3>
      </template>
      <template v-slot:body>
        <our-image-upload v-on:complete="toggleModal" v-on:cancel="toggleModal"></our-image-upload>
      </template>
    </our-modal>
    <our-modal :show="showModal && modalPage === 2" v-on:dismiss="toggleModal">
      <template v-slot:header>
        <h3 class="text-xl font-semibold mb-4">Are you sure you want to delete this account?</h3>
      </template>
      <template v-slot:body>
        <our-delete-account-form v-on:complete="signOut" v-on:cancel="toggleModal"></our-delete-account-form>
      </template>
    </our-modal>
    <our-modal :show="showModal && modalPage === 3" v-on:dismiss="toggleModal">
      <template v-slot:header>
        <h3 class="font-bold text-lg font-circular mb-6">Edit Personal Info</h3>
      </template>
      <template v-slot:body>
        <our-edit--personal-details-form v-on:complete="toggleModal" v-on:cancel="toggleModal"></our-edit--personal-details-form>
      </template>
    </our-modal>
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
  data() {
    return {
      showModal: false,
      modalPage: null,
    };
  },
  methods: {
    signOut() {
      this.$store.commit('clearCurrentUser');
      this.$store.commit('clearJWT');
      this.$router.push('home');
      window.location.reload();
    },
    toggleModal(page) {
      this.modalPage = page;
      this.showModal = !this.showModal;
    },
  },
};
</script>

<style lang="scss">
  .avatar {
    border: 1px solid lightgray;
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
