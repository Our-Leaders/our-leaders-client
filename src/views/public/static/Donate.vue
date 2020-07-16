<template>
  <div class="min-h-screen">
    <!-- Header -->
    <div class="w-full lg:w-10/12 xl:w-10/12 mx-auto flex flex-wrap lg:px-6 xl:px-6 mb-20">
      <div class="flex flex-wrap w-full lg:hidden xl:hidden">
        <h3 class="w-full text-5xl mb-8 px-6"><span class="text-primary">Help</span> us do<br/>more</h3>
        <img class="block h-64 mx-auto mb-16" src="@/assets/img/donate-0.png"/>
        <p class="px-6">
          OurLeaders.Africa is a nonprofit organization that focuses on driving accountability and
transparency in governance. Join us in building transparent and accountable leadership across the African continent by making a donation today.
        </p>
      </div>
      <div class="w-full lg:w-1/2 xl:w-1/2 lg:pt-20 xl:pt-20 lg:pb-3 xl:pb-3 lg:pr-2 xl:pr-2 hidden lg:block xl:block">
        <h3 class="text-6xl mb-8"><span class="text-primary">Help</span> us do more</h3>
        <p>
          <span class="text-7xl float-left text-gray-300 leading-letter-lg">O</span>
          <span class="leading-loose">
            urLeaders.Africa is a nonprofit organization that focuses on driving accountability and transparency in governance. Join us in building transparent and accountable leadership across the African continent by making a donation today.
          </span>
        </p>
      </div>
      <div class="w-1/2 relative hidden lg:block xl:block">
        <img class="h-84 absolute bottom-0 left-0 right-0 mx-auto" src="@/assets/img/donate-0.png"/>
      </div>
    </div>

    <!-- How We Spend The Money -->
    <div class="w-full lg:w-10/12 xl:w-10/12 lg:mx-auto xl:mx-auto px-2 lg:px-6 xl:px-6 mb-20">
      <h3 class="text-4xl">Where Your Money Goes</h3>
      <hr class="border-primary my-5"/>
      <div class="flex flex-wrap">
        <div class="w-full lg:w-1/3 xl:w-1/3 lg:pr-4 xl:pr-4 py-2 flex">
          <div class="border border-black px-2 py-8 lg:p-8 xl:p-8 hover:bg-primary hover:text-white hover:border-primary">
            <h3 class="font-bold text-lg mb-6">Research &amp; Development</h3>
            <h3 class="leading-snug">
              A lot of our work thrives on a strong research and development process; because of your support, we’re able to not only garner and verify a vast amount of data, but we’re able to do this efficiently and expeditiously.
            </h3>
          </div>
        </div>
        <div class="w-full lg:w-1/3 xl:w-1/3 py-2 lg:px-2 xl:px-2 flex">
          <div class="border border-black px-2 py-8 lg:p-8 xl:p-8 hover:bg-primary hover:text-white hover:border-primary">
            <h3 class="font-bold text-lg mb-6">Technology</h3>
            <h3 class="leading-snug">
              Your donation builds top-tier technology in order to keep the platform running, but most importantly, to keep it safe.
            </h3>
          </div>
        </div>
        <div class="w-full lg:w-1/3 xl:w-1/3 py-2 lg:pl-2 xl:pl-2 flex">
          <div class="border border-black px-2 py-8 lg:p-8 xl:p-8 hover:bg-primary hover:text-white hover:border-primary">
            <h3 class="font-bold text-lg mb-6">The Team</h3>
            <h3 class="leading-snug">
              Your donation also covers the welfare, wellbeing and overall health of the hardworking team behind this platform. Because of your support, we are able to hire, train and keep the right people to get the job done.
            </h3>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-wrap relative mb-10">
      <div class="absolute left-0 mt-24 hidden lg:visible xl:visible">
        <div class="block w-20 h-32 mx-auto">
          <span class="inline-block h-1 w-1 mx-2 bg-primary" v-for="index in 20" :key="index"></span>
        </div>
        <div id="donate-block-1" class="block bg-primary w-10 h-10 float-right"></div>
      </div>

      <!-- Bottom Group -->
      <img id="donate-block-2" class="hidden lg:visible xl:visible absolute bottom-0 right-0 z-20 mr-38 mb-16" src="@/assets/img/donate-2.png"/>
      <img id="donate-block-3" class="hidden lg:visible xl:visible absolute bottom-0 right-0 z-10 mb-38" src="@/assets/img/donate-3.png"/>
      <div id="donate-block-4" class="hidden lg:visible xl:visible absolute bottom-0 right-0 z-10 block w-28 h-20 mx-auto">
        <span class="inline-block h-1 w-1 mx-2 bg-primary" v-for="index in 15" :key="index"></span>
      </div>

      <div class="w-full lg:w-10/12 xl:w-10/12 lg:px-6 xl:px-6 mx-2 lg:mx-auto xl:mx-auto">
        <div class="flex flex-wrap bg-gray-100 px-6 py-12 mb-10">
          <div class="w-full lg:w-1/2 xl:w-1/2">
            <hr class="border-primary border-2 w-5/12 lg:w-2/12 xl:w-2/12 mb-4"/>
            <h3 class="text-4xl mb-2 lg:mb-6">Make a Donation</h3>
            <!-- <p>We use donations to pay for our domain, servers and <br class="hidden lg:visible xl:visible"/>other things that keep the platform running</p> -->
          </div>
          <div class="w-full lg:w-1/2 xl:w-1/2 pt-4 lg:pt-12 lg:pl-8 xl:pl-8 lg:pr-32 xl:pr-32">
            <label class="block" for="password">
              <span class="font-semibold">Enter the amount</span>
            </label>
            <div class="input-fields mb-6">
              <span class="inline-block w-3/12 lg:w-2/12 xl:w-2/12 lg:pr-1 xl:pr-1">
                <our-select-dropdown
                  :options="currencies"
                  v-model="donation.type"
                  :initialValue="currencies[0]"
                  v-on:change="setDonationType"
                  field="currencies"></our-select-dropdown>
              </span>
              <input class="w-9/12 lg:w-10/12 xl:w-10/12 mb-1 pl-2 bg-transparent"
                type="text"
                id="amount"
                name="amount"
                v-model="donation.amount"
                v-money="money"
                placeholder="Enter donation amount. E.g. 10,000"
                required/>
            </div>
            <button class="btn-primary w-full" @click="toggleModal" :disabled="isDisabled">Donate</button>
          </div>
        </div>

        <div class="flex flex-wrap px-6 py-12">
          <div class="w-full">
            <hr class="border-primary border-2 w-5/12 lg:w-1/12 xl:w-1/12 mb-4"/>
            <h3 class="inline-block text-4xl lg:mr-10 xl:mr-10">We also accept <br class="hidden lg:visible xl:visible"/>bank deposits</h3>
            <span class="inline-block">You can also send your donations to the following <br class="hidden lg:visible xl:visible"/>bank accounts</span>
          </div>
          <div class="flex flex-wrap lg:flex-no-wrap w-full pt-12">
            <div class="w-full lg:w-1/2 inline-block bg-transparent border-2 border-gray-300 px-3 py-4 mb-8 lg:mr-5">
              <img class="h-12 float-left text-black inline-block mr-4 lg:mr-8 xl:mr-8"
                src="@/assets/img/zenith-bank.png"/>
              <span class="inline-block lg:mr-16 xl:mr-16">Olubrain Leadership Foundation<br/>1016694030<br/>NGN</span>
            </div>
            <div class="w-full lg:w-1/2 inline-block bg-transparent border-2 border-gray-300 px-3 py-4 mb-8">
              <img class="h-12 float-left text-black inline-block mr-4 lg:mr-8 xl:mr-8"
                src="@/assets/img/zenith-bank.png"/>
              <span class="inline-block lg:mr-16 xl:mr-16">Olubrain Leadership Foundation<br/>5071277360<br/>USD</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-wrap px-2 lg:px-6 xl:px-6 lg:py-12 xl:py-12 text-center my-10">
      <div class="w-full lg:w-7/12 xl:w-7/12 mx-auto relative">
        <div id="donate-block-5" class="hidden lg:visible xl:visible absolute border border-primary left-0 top-0 h-40 w-40"></div>
        <hr class="absolute border border-primary left-0 right-0 top-0 mt-4 mx-auto w-16"/>
        <p class="text-2xl mt-16">OurLeaders.Africa is built for The People &amp;
          <br class="hidden lg:block"/>The Leaders, by The People &amp;
          <br class="hidden lg:block"/>The Leaders.
        </p>
      </div>
    </div>

    <our-modal :show="showModal" v-on:dismiss="toggleModal">
      <template v-slot:header>
        <h3 class="font-bold text-lg font-circular mb-6">Donate to the cause</h3>
      </template>
      <template v-slot:body>
        <p class="mb-6">You are about to donate {{donation.amount | getValue('money')}}. We are glad to have you be a part of this cause.</p>
        <p class="mb-6" v-if="donation.isAnonymous">We see that you would like to be anonymous, we are grateful and will ensure your details are not stored.</p>
        <form @submit.prevent="donate" v-if="page === 0">
          <div class="mb-6" v-if="!donation.isAnonymous">
            <label class="block font-semibold" for="name">Full Name</label>
            <input class="field w-full py-2"
              type="text"
              id="name"
              name="name"
              v-model="donation.name"
              placeholder="Enter name"
              :required="!donation.isAnonymous"/>
          </div>
          <div class="mb-6" v-if="!donation.isAnonymous">
            <label class="block font-semibold" for="email">Email</label>
            <input class="field w-full py-2"
              type="text"
              id="email"
              name="email"
              v-model="donation.email"
              placeholder="Enter email"
              required/>
          </div>
          <div class="mb-6">
            <input class="field py-2 mr-2"
              type="checkbox"
              id="anonymous"
              name="anonymous"
              v-model="donation.isAnonymous"/>
            <label class="inline-block align-middle font-semibold" for="anonymous">I would like to remain anonymous.</label>
          </div>
          <button class="btn-primary px-6 py-2 w-full"
            :class="{ 'btn-loading' : processing }">Initialize Payment</button>
        </form>
        <div v-if="page === 1">
          <paystack
            class="btn-primary px-6 py-2 w-full"
            :amount="transaction.amount"
            :email="transaction.email"
            :currency="paymentCurrency"
            :paystackkey="transaction.key"
            :reference="transaction.ref"
            :callback="transactionCallback"
            :close="transactionClosed"
            :embed="false"></paystack>
        </div>
      </template>
    </our-modal>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import paystack from 'vue-paystack';
import currencies from '../../../assets/json/currencies.json';
import ValidatorUtil from '../../../helpers/validatorUtil';

export default {
  name: 'donate',
  components: {
    paystack,
  },
  computed: {
    isDisabled() {
      return this.donation.amount === null || !this.donation.amount;
    },
    money() {
      return ValidatorUtil.isDefined(this.donation.type) ? this.donation.type.mask : this.currencies[0].mask;
    },
    paymentCurrency() {
      const index = this.currencies.findIndex(x => x.value === this.transaction.currency);
      return index === -1 ? null : this.currencies[index].label;
    },
  },
  data() {
    return {
      currencies: currencies.currencies,
      donation: {
        name: null,
        email: null,
        type: currencies[0],
        amount: null,
        isAnonymous: false,
      },
      donationsService: this.$serviceFactory.donations,
      page: 0,
      processing: false,
      showModal: false,
      transaction: {
        key: null,
        email: null,
        amount: null,
        currency: null,
        ref: null,
      },
    };
  },
  methods: {
    ...mapActions([
      'displayError',
      'displayInfo',
      'displaySuccess',
    ]),
    async donate() {
      try {
        this.processing = true;
        const amount = this.donation.amount.replace(/\D/, '').replace(',', '');
        const data = {
          name: this.donation.isAnonymous ? 'Anonymous Donation' : this.donation.name,
          email: this.donation.isAnonymous ? 'anonymous@our-leaders.com' : this.donation.email,
          currency: this.donation.type.value,
          amount: parseInt(amount, 10) * 100,
          isAnonymous: this.donation.isAnonymous,
        };

        const response = await this.donationsService.initiateTransaction(data);

        this.transaction = response.data.transaction;
        this.processing = false;
        this.page = 1;
      } catch (error) {
        this.processing = false;
        this.displayError(error);
      }
    },
    resetData() {
      this.donation = {
        name: null,
        email: null,
        type: this.currencies[0],
        amount: null,
        isAnonymous: false,
      };
    },
    setDonationType(field, donationType) {
      const index = this.currencies.findIndex(x => x.value === donationType);
      this.donation.type = this.currencies[index];
    },
    toggleModal() {
      this.showModal = !this.showModal;
      this.page = 0;
    },
    transactionCallback() {
      this.toggleModal();
      this.resetData();
      this.displaySuccess({
        message: 'Your payment is processing, we will send you an email once it is successful. Thank you.',
      });
    },
    transactionClosed() {
      this.toggleModal();
      this.displayInfo({
        message: 'Payment has been cancelled.',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  #donate-block-1 {
    transform: translateX(50%);
  }

  #donate-block-4 {
    margin-bottom: 23rem;
    margin-right: 22rem;
  }

  #donate-block-5 {
    margin-left: 17%;
  }
</style>
