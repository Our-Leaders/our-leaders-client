<template>
  <div class="w-full lg:w-10/12 lg:mx-auto">
    <div class="flex flex-wrap">
      <div class="w-full md:w-1/2 p-20">
        <h3 class="text-6xl mb-6">FAQs</h3>
        <p class="text-base">If you need help getting around, you can search here to get assistance. Start by typing into the search bar.</p>
      </div>
      <div class="w-full md:w-1/2 relative">
        <div id="faq-input" class="absolute bottom-0 w-full md:w-11/12 flex flex-row bg-white py-8 px-8 z-30 md:shadow-2xl">
          <input class="w-8/12 lg:w-10/12 xl:w-10/12 bg-transparent field mr-5"
            type="text"
            id="query"
            name="query"
            v-model="query"
            placeholder="What do you need help with?"
            required/>
          <div class="w-3/12">
            <button class="btn-grey-outline py-2 px-6" @click="search">Search</button>
          </div>
          <div id="faq-result" class="absolute bottom-0 left-0 p-3 bg-white w-full shadow-2xl" v-if="openSearchList" v-on-clickout="toggleSearchNav">
            <div v-for="(title, i) in results.keys" :key="i">
              <label class="capitalize text-xs">{{title}}</label>
              <span class="my-2 font-circular block text-base py-1 leading-snug cursor-pointer hover:text-primary"
              v-for="(result, j) in results.data[title]"
              :key="j"
              @click="navigateTo(title, result)">{{result.label}}</span>
            </div>
          </div>
        </div>
        <div class="hidden md:block w-28 h-28 mx-auto absolute top-0 right-0 left-0 z-20">
          <span class="inline-block h-1 w-1 mx-2 bg-primary" v-for="index in 20" :key="index"></span>
        </div>
        <img id="faq-img" class="absolute right-0 bottom-0 z-10" src="@/assets/img/faq.png"/>
      </div>
    </div>
    <hr/>
    <div class="w-11/12 md:w-7/12 py-8 mx-auto">
      <our-tabs class="mb-6" ref="faqTabs" v-on:change="setMain" :tabs='mainTabs' :tab-type="'secondary'"></our-tabs>
       <div v-for="(faq, index) of faqsList[page]" :key="`top_${page}_${index}`" class="faq-question border-b border-gray-db relative block">
        <input type="checkbox" :name="`${page}_${index}`" :ref="`${page}_${index}`" :id="`${page}_${index}`" class="invisible absolute">
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
import { mixin as clickout } from 'vue-clickout';
import faqsList from '@/assets/json/faqs.json';

export default {
  mixins: [clickout],
  name: 'faqs',
  data() {
    return {
      faqsList,
      mainTabs: [{ label: 'General', value: 'general' }, { label: 'Leaders', value: 'leaders' }, { label: 'Political Parties', value: 'political-parties' }],
      openSearchList: false,
      page: 'general',
      query: null,
      results: {
        keys: [],
        data: {},
      },
      searchParams: ['general', 'leaders', 'political-parties'],
    };
  },
  methods: {
    navigateTo(section, result) {
      this.page = section;
      this.$refs.faqTabs.updateActiveTab(section);
      this.openSearchList = false;
      const ref = `${section}_${result.index}`;
      setTimeout(() => {
        this.$refs[ref][0].click();
      }, 500);
    },
    search() {
      this.openSearchList = true;
      this.results = {
        keys: [],
        data: {},
      };

      this.searchParams.forEach((element) => {
        this.faqsList[element].forEach((item, index) => {
          if (item.question.toLowerCase().includes(this.query)) {
            if (!Array.isArray(this.results.data[element])) {
              this.results.keys.push(element);
              this.results.data[element] = [];
            }

            this.results.data[element].push({ index, label: item.question });
          }
        });
      });
    },
    setMain(value) {
      this.page = value;
    },
    toggleSearchNav() {
      this.openSearchList = !this.openSearchList;
    },
  },
};
</script>

<style lang="scss">
  #faq-img {
    display: none;
    height: 281px;
    transform: translateX(24%);
    width: 389px;

    @screen md {
      display: block;
    }
  }

  #faq-input {
    bottom: 19%;
  }

  #faq-result {
    transform: translateY(110%);
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
