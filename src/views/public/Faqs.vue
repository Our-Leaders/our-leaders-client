<template>
  <div class="w-full lg:w-10/12 lg:mx-auto">
    <div class="flex flex-wrap">
      <div class="w-1/2 p-20">
        <h3 class="text-6xl mb-6">FAQs</h3>
        <p class="text-base">If you need help getting around, you can search here to get assistance. Start by typing into the search bar.</p>
      </div>
      <div class="w-1/2 relative">
        <div id="faq-input" class="absolute bottom-0 w-11/12 flex flex-row bg-white py-8 px-8 z-30 shadow-2xl">
          <input class="w-8/12 lg:w-10/12 xl:w-10/12 bg-transparent field mr-5"
            type="text"
            id="query"
            name="query"
            v-model="query"
            placeholder="What do you need help with?"
            required/>
          <div class="w-3/12">
            <button class="btn-grey-outline py-2 px-6">Search</button>
          </div>
        </div>
        <div class="block w-28 h-28 mx-auto absolute top-0 right-0 left-0 z-20">
          <span class="inline-block h-1 w-1 mx-2 bg-primary" v-for="index in 20" :key="index"></span>
        </div>
        <img id="faq-img" class="absolute right-0 bottom-0 z-10" src="@/assets/img/faq.png"/>
      </div>
    </div>
    <hr/>
    <div class="w-7/12 py-8 mx-auto">
      <our-tabs class="mb-6" v-on:change="setMain" :tabs='mainTabs' :tab-type="'secondary'"></our-tabs>
       <div v-for="(faq, index) of faqsList[page]" :key="index" class="faq-question border-b border-gray-db relative block">
        <input type="checkbox" :name="`${page}_${index}`" :id="`${page}_${index}`" class="invisible absolute">
        <label :for="`${page}_${index}`">
          <header class="py-5 cursor-pointer">
            <div class="relative flex justify-between items-center">
              <span class="font-semibold capitalize font-circular text-base">{{faq.question}}</span>
              <span class="flex">
                <img alt="chevron-down">
              </span>
            </div>
          </header>
        </label>
        <div class="mb-4 pr-12 faq-question-detail">
          <p>{{faq.answer}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import faqsList from '@/assets/json/faqs.json';

export default {
  name: 'faqs',
  data() {
    return {
      faqsList,
      mainTabs: [{ label: 'General', value: 'general' }, { label: 'Leaders', value: 'leaders' }, { label: 'Political Parties', value: 'political-parties' }],
      page: 'general',
      query: null,
    };
  },
  methods: {
    setMain(value) {
      this.page = value;
    },
  },
};
</script>

<style lang="scss">
  #faq-img {
    height: 281px;
    transform: translateX(24%);
    width: 389px;
  }

  #faq-input {
    bottom: 19%;
  }

  .faq-question-detail {
    display: none;
  }
  .faq-question header img {
    content: url('~@/assets/img/plus.svg');
    transition: 0.4s transform;
  }
  .faq-question input[type="checkbox"]:checked ~ label header {
    @apply text-primary;
  }

  .faq-question input[type="checkbox"]:checked ~ label header img {
    transform: rotate(180deg);
    content: url('~@/assets/img/dash.svg');
  }
  .faq-question input[type="checkbox"]:checked ~ .faq-question-detail {
    display: block;
  }
</style>
