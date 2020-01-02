<template>
  <div class="home bg-overlay">
    <div class="header">
      <div class="flex mb-8">
        <div class="relative w-full mx-auto h-auto">
          <div class="flex justify-between bg-gray-fa px-12 py-16">
            <div class="header-left-section">
              <span class="text-primary">Monitor</span> the progress and performance of <router-link :to="{ name: 'politicians' }" class="border-b-4 border-primary">{{ totalPoliticians }}</router-link> African leaders
            </div>
            <div class="trending-slide-section">
              <our-trending-politician :politician="politicians[0]" :total="politicians.length"></our-trending-politician>
            </div>
          </div>
        </div>
      </div>

      <div class="flex mb-24">
        <div class="relative w-full mx-auto h-auto">
          <div class="flex flex-wrap flex-col-reverse lg:flex-row">
            <div class="w-full pr-4">
              <our-tabs class="mb-6" v-on:change="setSecondary" :tabs='secondaryTabs' :tab-type="'secondary'"></our-tabs>
              <div class="flex justify-between">
                <h3 class="text-4xl">Highest Voted Leaders</h3>
                <router-link :to="{ name: 'politicians' }">View all leaders</router-link>
              </div>
              <div class="flex mb-4">
                <div class="w-full" v-if="loading">
                  <span class="loading lg mx-auto"></span>
                </div>
              </div>
              <div v-if="!loading">
                <our-home-politicians :politicians="politicians" ></our-home-politicians>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex mb-40">
        <div class="relative w-full mx-auto h-auto">
          <div class="bg-gray-fa px-12 py-32">
            <div class="flex justify-start flex-col lg:flex-row what-to-do-section">
              <div class="what-to-do-left-section">
                <h1>What <span class="text-primary">you</span> <span class="whitespace-pre">can do here</span></h1>
                <p class="mb-10 mt-6">Get instant updates on your favourite African leaders.</p>
                <router-link :to="{ name: 'politicians' }" class="px-4 py-2 mt-0 btn-primary inline-block w-40 text-center hidden lg:block">View leaders</router-link>
              </div>
              <div class="what-to-do-right-section w-full xl:ml-16 relative">
                <div class="what-to-do-right-container">
                  <div class="what-to-do-right-content what-to-do-subscribe flex justify-between items-center bg-white relative lg:absolute">
                    <p class="what-to-do-subscribe-text text-2xl py-6">Subscribe to your favourite leaders</p>
                    <div class="relative subscribe-hand">
                      <span class="absolute"><img src="@/assets/img/subscribe-hand.svg"/></span>
                    </div>
                  </div>
                  <div class="what-to-do-right-content what-to-do-vote flex justify-between items-center bg-white relative lg:absolute">
                    <p class="what-to-do-vote-text text-2xl py-6">Upvote or downvote leaders on the platform</p>
                    <div class="relative vote-thumb">
                      <span class="absolute"><img src="@/assets/img/thumbs-up-with-shards.svg"/></span>
                    </div>
                  </div>
                  <div class="what-to-do-right-content what-to-do-view flex justify-between items-center bg-white relative lg:absolute">
                    <p class="what-to-do-view-text text-2xl py-6">See up-to-date accomplishments of leaders</p>
                    <div class="relative view-note">
                      <span class="absolute"><img src="@/assets/img/note.svg"/></span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="lg:hidden">
                <router-link :to="{ name: 'politicians' }" class="mt-8 px-4 py-2 lg:mt-0 btn-primary inline-block w-40 text-center">View leaders</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col mb-4">
        <div class="w-full mx-auto h-auto">
          <div class="collage-section relative">
            <div>
              <div class="collage-image image-1">
                <img class="absolute" src="@/assets/img/leaders/amadu-bello.svg"/>
              </div>
              <div class="collage-image image-2">
                <img class="absolute" src="@/assets/img/leaders/nelson-mandela.svg"/>
              </div>
              <div class="collage-image image-3">
                <img class="absolute" src="@/assets/img/leaders/nnamdi-azikiwe.svg"/>
              </div>
            </div>
            <div class="w-screen lg:w-full flex justify-center relative">
              <div class="collage-shape left">
                <div class="rect left-rect absolute"></div>
                <div class="dots left-dots absolute">
                  <div class="block w-40 h-40 mx-auto">
                    <span v-for="n in 25" :key="n" class="dot"></span>
                  </div>
                </div>
              </div>
              <div class="quote-section">
                <div class="quote-content">
                  <h1>Our Children may learn about heroes of the past. Our task is to make ourselves architects of the future</h1>
                  <span class="mt-4 px-4 py-2 lg:mt-0">- Jomo Kenyatta -</span>
                </div>
              </div>
              <div class="collage-shape right">
                <div class="rect right-rect absolute"></div>
                <div class="dots right-dots absolute">
                  <div class="block w-40 h-40 mx-auto">
                    <span v-for="n in 25" :key="n" class="dot"></span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="collage-image image-4">
                <img class="absolute" src="@/assets/img/leaders/jomo-kenyatta.svg"/>
              </div>
              <div class="collage-image image-5">
                <img class="absolute" src="@/assets/img/leaders/kwame-nkrumah.svg"/>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-32 flex justify-center text-center">
          <our-subscription></our-subscription>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { politiciansMock } from '@/constants/examples';

export default {
  name: 'home',
  data() {
    return {
      loading: false,
      politicians: [],
      secondaryTabs: [{ label: 'Current Leaders', value: null }, { label: 'Upcoming Leaders', value: 'upcoming-leaders' }, { label: 'Parties', value: 'parties' }],
    };
  },
  created() {
    this.getPoliticians();
  },
  methods: {
    async getPoliticians() {
      this.politicians = politiciansMock;
    },
    setSecondary() {
      this.getPoliticians();
    },
  },
  computed: {
    totalPoliticians() {
      return this.politicians.length;
    },
  },
};
</script>

<style lang="scss" scoped>
  .bg-overlay {
    background-image: url('../../assets/img/bg-pattern-home.svg');
    background-size: 135% 100%;

    @screen xl {
      margin-top: -100px;
    }
  }

  .header {
    margin: auto;
    padding: 0 0 5rem 0;
    width: calc(100% - 3rem);

    @screen xl {
      padding: 8rem 10rem;
      width: 77%;
    }

    @screen lg {
      width: 90%;
    }

    .header-left-section {
      display: block;
      font-size: 2.5rem;
      line-height: 3.75rem;
      max-width: 41.75rem;

       @screen xl {
        font-size: 3.75rem;
        line-height: 4.875rem;
      }
    }

    .what-to-do-section {
      .what-to-do-left-section {
        h1 {
          font-size: 2.5rem;
          line-height: 3.75rem;

          @screen xl {
            font-size: 3.75rem;
            line-height: 4.875rem;
          }
        }
      }

      .what-to-do-right-section {
        .what-to-do-right-container {
          padding-top: 2rem;

          @screen lg {
            padding-top: 0;
            position: absolute;
            right: 0;
            top: -9rem;
          }
        }

        .what-to-do-right-content {
          @apply shadow-primary;
          padding: 1.8rem 2rem;
          width: 31.25rem;
          z-index: 1;

          &.what-to-do-subscribe {
            left: 0;

            @screen lg {
              right: 3.125rem;
              top: 0;
              left: initial;
            }

            .what-to-do-subscribe-text {
              width: 12rem;
            }

            .subscribe-hand > span {
              height: auto;
              right: 0;
              top: -2.3rem;
              width: 11rem;
            }
          }

          &.what-to-do-vote {
            @apply shadow-primary float-right;
            padding: 1.8rem 2rem;
            margin: 1.375rem 0;

            @screen lg {
              float: none;
              margin-top: 0;
              right: -5.5rem;
              top: 13rem;
            }

            .what-to-do-vote-text {
              width: 15.8125rem;
            }

            .vote-thumb > span {
              height: auto;
              right: -1rem;
              top: -4.5rem;
              width: 10.5rem;
            }
          }

          &.what-to-do-view {
            width: 33rem;

            @screen lg {
              right: 1.125rem;
              top: 26rem;
            }

            .what-to-do-view-text {
              width: 19rem;
            }

            .view-note > span {
              height: auto;
              right: -4rem;
              top: -6.6rem;
              width: 16rem;
            }
          }
        }
      }
    }

    .trending-slide-section {
      margin: 0 3rem 0 3rem;

      @screen xl {
        margin: 0 0 0 4rem;
      }
    }
  }

  .politician-container {
    &:not(:first-child) {
      padding: 0 1rem;
    }
  }

  .toggle-arrow {
    @apply absolute cursor-pointer;

    img {
      width: 1rem;
    }

    &.toggle-arrow-left {
      bottom: calc(50% - 0.5rem);
      left: -2.875rem;
    }

    &.toggle-arrow-right {
      bottom: calc(50% - 0.5rem);
      right: -2.875rem;
    }
  }

  .quote-section {
    position: relative;
    display: inline-block;
    z-index: 1;

    .quote-content {
      padding: 2.9375rem 2rem;
      text-align: center;
      width: 33.5rem;

      @screen lg {
        background: rgba(255, 255, 255, 0.6);
        backdrop-filter: blur(20px);
      }

      h1 {
        font-size: 1.5rem;
        line-height: 1.9375rem;
        margin-bottom: 2.25rem;
        position: relative;

        &::before {
          background: theme('colors.primary');
          content: '';
          height: 0.133rem;
          left: calc(50% - 3.5rem);
          position: absolute;
          top: -1.5rem;
          width: 7rem;
        }

        @screen md {
          font-size: 2rem;
          line-height: 2.9375rem;
          margin-bottom: 1.5rem;
        }

        @screen lg {
          font-size: 2.25rem;
        }
      }
    }
  }

  .collage-section {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    @screen lg {
      height: 45rem;
    }

    .collage-image {
      display: none;
      position: relative;
      min-width: 15rem;

      @screen lg {
        display: inline-block;
      }

      @screen xl {
        min-width: 20rem;
      }

      &.image-1 img {
        left: -1.275rem;
        top: -0.3rem;

        @screen xl {
          left: 0.725rem;
        }
      }

      &.image-2 img {
        left: -0.25rem;
        top: -5rem;

        @screen xl {
          left: -0.25rem;
        }
      }

      &.image-3 img {
        left: 0.5rem;
        top: 2rem;

        @screen xl {
          left: -0.5rem;
        }
      }

      &.image-4 img {
        left: -6.7rem;
        top: -16rem;

        @screen xl {
          left: -6.7rem;
        }
      }

      &.image-5 {
        width: 20rem;

        img {
          left: -5.25rem;
          top: -8rem;
          z-index: -1;
        }

        @screen xl {
          width: 22.5rem;

          img {
            left: -6.25rem;
          }
        }
      }
    }

    .collage-shape {
      @apply absolute top-0 inline-block w-full;
      height: 20rem;
      overflow: hidden;

      &.left {
        @apply left-0 bottom-0;
      }

      &.right {
        @apply right-0 top-0;
      }

      @screen lg {
        width: auto;
        height: auto;
        overflow: initial;
      }

      .dots {
        display: none;

        &.left-dots {
          left: 8.8rem;
          top: calc(100% + 5.5rem);

          @screen lg {
            display: inline-block;
          }
        }

        &.right-dots {
          display: inline-block;
          right: -7rem;
          top: 9.8rem;
          z-index: 1;

          @screen lg {
            right: 2.2rem;
            top: 5.5rem;
          }
        }

        .dot {
          @apply inline-block mx-3 my-2 bg-primary;
          height: 0.375rem;
          width: 0.375rem;
        }
      }

      .rect {
        display: none;

        &.left-rect {
          @apply bg-primary;
          height: 6.375rem;
          left: 8.325rem;
          bottom: -3.2rem;
          width: 5rem;

          @screen lg {
            display: inline-block;
          }
        }

        &.right-rect {
          @apply bg-primary;
          display: inline-block;
          height: 2.5rem;
          left: -1.25rem;
          top: 0;
          width: 2.5rem;
          z-index: 1;

          @screen lg {
            right: 11.5rem;
            top: 1rem;
            left: initial;
          }
        }
      }
    }
  }
</style>
