<template>
  <div class="min-h-screen">
    <!-- Header -->
    <div class="w-10/12 mx-auto flex lg:px-6 xl:px-6 mb-20">
      <div class="w-1/2 lg:pt-20 xl:pt-20 lg:pb-3 xl:pb-3 lg:pr-2 xl:pr-2">
        <h3 class="text-6xl mb-8"><span class="text-primary">Help</span> us do more</h3>
        <p>
          <span class="text-7xl float-left text-gray-300 leading-letter-lg">W</span>
          <span class="leading-loose">
            e aim to educate The People on how to properly get involved with policies and decisions being made on their behalf and how these decisions may affect The People. We also aim to create a platform where
            <br/>
            The Leaders can learn directly from The People. Their perspectives,
            <br/>
            opinions, and ideas, and utilize this information when making decisions on
            <br/>
            behalf of The People.
          </span>
        </p>
      </div>
      <div class="w-1/2 relative">
        <img class="h-84 absolute bottom-0 left-0 right-0 mx-auto" src="@/assets/img/donate-1.png"/>
      </div>
    </div>

    <!-- How We Spend The Money -->
    <div class="w-10/12 mx-auto lg:px-6 xl:px-6 mb-20">
      <h3 class="text-4xl">How We Spend Your Money</h3>
      <hr class="border-primary my-5"/>
      <div class="flex flex-wrap">
        <div class="w-1/3 pr-4 py-2">
          <div class="border border-black p-8">
            <h3 class="font-bold text-lg mb-6">The platform</h3>
            <h3 class="leading-snug">
              We use donations to pay for our
              <br/>
              domain, servers and other things that
              <br/>
              keep the platform running
            </h3>
          </div>
        </div>
        <div class="w-1/3 p-2">
          <div class="bg-primary text-white border border-primary p-8">
            <h3 class="font-bold text-lg mb-6">The platform</h3>
            <h3 class="leading-snug">
              We use donations to pay for our
              <br/>
              domain, servers and other things that
              <br/>
              keep the platform running
            </h3>
          </div>
        </div>
        <div class="w-1/3 pl-2 py-2">
          <div class="border border-black p-8">
            <h3 class="font-bold text-lg mb-6">The platform</h3>
            <h3 class="leading-snug">
              We use donations to pay for our
              <br/>
              domain, servers and other things that
              <br/>
              keep the platform running
            </h3>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-wrap relative mb-10">
      <div class="absolute left-0 mt-24">
        <div class="block w-20 h-32 mx-auto">
          <span class="inline-block h-1 w-1 mx-2 bg-primary" v-for="index in 20" :key="index"></span>
        </div>
        <div id="donate-block-1" class="block bg-primary w-10 h-10 float-right"></div>
      </div>

      <!-- Bottom Group -->
      <img id="donate-block-2" class="absolute bottom-0 right-0 z-20 mr-38 mb-16" src="@/assets/img/donate-2.png"/>
      <img id="donate-block-3" class="absolute bottom-0 right-0 z-10 mb-38" src="@/assets/img/donate-3.png"/>
      <div id="donate-block-4" class="absolute bottom-0 right-0 z-10 block w-28 h-20 mx-auto">
        <span class="inline-block h-1 w-1 mx-2 bg-primary" v-for="index in 15" :key="index"></span>
      </div>

      <div class="w-10/12 lg:px-6 xl:px-6 mx-auto">
        <div class="flex flex-wrap bg-gray-100 px-6 py-12 mb-10">
          <div class="w-1/2">
            <hr class="border-primary border-2 w-2/12 mb-4"/>
            <h3 class="text-4xl mb-6">How much do you<br/>want to give?</h3>
            <p>We use donations to pay for our domain, servers and<br/>other things that keep the platform running</p>
          </div>
          <div class="w-1/2 pt-12 pl-8 pr-32">
            <label class="block" for="password">
              <span class="font-semibold">Enter the amount</span>
            </label>
            <div class="input-fields mb-6">
              <span class="inline-block w-2/12 pr-1">
                <our-select-dropdown
                  :options="currencies"
                  v-model="donation.type"
                  :initialValue="currencies[0]"
                  field="currencies"></our-select-dropdown>
              </span>
              <input class="w-10/12 mb-1 pl-2 bg-transparent"
                type="number"
                id="amount"
                name="amount"
                v-model="donation.amount"
                placeholder="Enter donation amount. E.g. 10,000"
                required>
            </div>
            <button class="btn-primary w-full" @click="donate">Donate</button>
          </div>
        </div>

        <div class="flex flex-wrap px-6 py-12">
          <div class="w-full">
            <hr class="border-primary border-2 w-1/12 mb-4"/>
            <h3 class="inline-block text-4xl mr-10">We also accept<br/>bank deposits</h3>
            <span class="inline-block">You can also send your donations to the following<br/>bank accounts</span>
          </div>
          <div class="w-full pt-12">
            <div class="inline-block bg-transparent border-2 border-gray-300 px-3 py-4 mb-8 mr-5">
              <img class="h-12 float-left text-black inline-block mr-8"
                src="@/assets/img/first-bank.png"/>
              <span class="inline-block  mr-16">Our Leaders Africa<br/>3056112345</span>
            </div>
            <div class="inline-block bg-transparent border-2 border-gray-300 px-3 py-4 mb-8">
              <img class="h-12 float-left text-black inline-block mr-8"
                src="@/assets/img/access-bank.svg"/>
              <span class="inline-block  mr-16">Our Leaders Africa<br/>3056112345</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-wrap px-6 py-12 text-center my-10">
      <div class="w-7/12 mx-auto relative">
        <div id="donate-block-5" class="absolute border border-primary left-0 top-0 h-40 w-40"></div>
        <hr class="absolute border border-primary left-0 right-0 top-0 mt-4 mx-auto w-16"/>
        <p class="text-2xl mt-16">OurLeaders.Africa was built by The
          <br/>People &amp; The Leaders, for The People
          <br/>
          &amp; The Leaders.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import currencies from '../../../assets/json/currencies.json';

export default {
  name: 'donate',
  data() {
    return {
      currencies: currencies.currencies,
      donation: {
        type: currencies[0],
        amount: null,
      },
    };
  },
  methods: {
    donate() {
      // TODO: Donate logic goes here
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
