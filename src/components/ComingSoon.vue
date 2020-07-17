<template>
  <div id="coming-parent">
    <div class="coming-soon-bg">
      <div class="hidden md:block left-side">
        <img class="z-20" src="@/assets/img/soon-left-1.png"/>
        <img class="z-20" src="@/assets/img/soon-left-2.png"/>
        <img class="z-20" src="@/assets/img/soon-left-3.png"/>
        <div id="block-1"></div>
        <div id="block-2"></div>
        <div id="block-3"></div>
      </div>
      <div class="hidden md:block right-side">
        <img class="z-20" src="@/assets/img/soon-right-1.png"/>
        <img class="z-20" src="@/assets/img/soon-right-2.png"/>
        <div id="block-1"></div>
      </div>
      <div class="w-full md:w-6/12 mx-auto main">
        <img class="w-12 md:w-24 z-20 mt-6 mx-auto" src="@/assets/img/logo.svg"/>
        <p class="p-3 md:p-0"><span class="text-primary">Monitor</span> the progress and performance of political leaders in Africa.</p>
        <p>Join the Waitlist and be notified when we launch.</p>
        <div class="w-10/12 text-center mx-auto">
          <form class="relative w-full px-6">
            <input class="w-full md:w-2/3 bg-gray-100 border-b border-grey-300 px-2 mt-1 mb-2 md:mb-0 outline-none h-10 font-circular" placeholder="Enter email" type="text" v-model="email" :disabled="processing"/>
            <button class="w-full md:w-1/3 bg-primary border border-primary px-12 outline-none h-10 text-white" type="button" @click="subscribe" :disabled="!email || processing">Join Waitlist</button>
          </form>
        </div>
        <img class="mx-auto my-4 z-20" src="@/assets/img/primary-down.svg"/>
      </div>
    </div>
    <button id="sample-button">Sample Leader Profile</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'our-coming-soon',
  data() {
    return {
      email: null,
      processing: false,
      subscriptionsServices: this.$serviceFactory.subscriptions,
    };
  },
  methods: {
    ...mapActions([
      'displayError',
      'displaySuccess',
    ]),
    async subscribe() {
      try {
        this.processing = true;
        await this.subscriptionsServices.addSubscription({
          email: this.email.toLowerCase(),
          type: 'newsletter',
        });
        this.email = null;
        this.processing = false;
        this.displaySuccess({ message: 'You have successfully been added to the waitlist.' });
      } catch (error) {
        this.processing = false;
        this.displayError(error);
      }
    },
  },
};
</script>

<style scoped lang="scss">
  #coming-parent {
    height: 95%;
    min-height: 90%;
    overflow: hidden;
    position: relative;
  }

  #sample-button {
    background: white;
    box-shadow: 0px 12px 30px rgba(0, 0, 0, 0.08);
    color: #969696;
    height: 60px;
    left: 0;
    margin: auto;
    position: absolute;
    right: 0;
    top: 700px;
    width: 448px;
    z-index: 40;
  }

  .coming-soon-bg {
    background: url("../assets/img/coming-soon-bg.svg");
    background-color: #FAFAFA;
    margin-bottom: 10%;
    height: 720px;
    position: absolute;
    width: 100%;
    z-index: 30;

    .main {
      p:nth-child(2) {
        font-size: 2.7rem;
        margin-bottom: 30px;
        margin-top: 30px;
        text-align: center;

        @screen md {
          font-size: 3.8rem;
          margin-top: 80px;
        }
      }

      p:nth-child(3) {
        font-size: 1rem;
        margin-bottom: 30px;
        text-align: center;

        @screen md {
          font-size: 1.5rem;
          margin-bottom: 30px;
        }
      }
    }

    .left-side {
      height: 100%;
      left: 0;
      position: absolute;
      width: 30%;

      img:nth-child(1) {
        position: absolute;
        top: 100px;
      }

      img:nth-child(2) {
        left: 80px;
        position: absolute;
        top: 283px;
      }

      img:nth-child(3) {
        position: absolute;
        top: 461px;
      }

      #block-1 {
        background: rgba(196, 196, 196, .6);
        display: block;
        height: 68px;
        left: 204px;
        position: absolute;
        top: 24%;
        width: 47px;
      }

      #block-2 {
        background: rgba(199, 153, 71, .3);
        display: block;
        height: 25px;
        left: 33px;
        position: absolute;
        top: 56%;
        width: 21px;
      }

      #block-3 {
        background: rgba(196, 196, 196, .8);
        display: block;
        height: 39px;
        left: 224px;
        position: absolute;
        bottom: 12%;
        width: 33px;
      }
    }

    .right-side {
      height: 100%;
      position: absolute;
      right: 0;
      width: 30%;

      img:nth-child(1) {
        position: absolute;
        right: 63px;
        top: 155px;
      }

      img:nth-child(2) {
        position: absolute;
        right: 0;
        top: 385px;
      }

      #block-1 {
        background: rgba(196, 196, 196, .6);
        display: block;
        height: 114px;
        right: 194px;
        position: absolute;
        top: 385px;
        width: 79px;
      }
    }
  }
</style>
