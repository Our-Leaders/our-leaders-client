<template>
  <div>
    <div class="pr-4 w-full">
      <div class="mb-6">
        <div v-for="(position, index) of parsedData.positions" :key="index" class="quarter-view-accomplishment border-b border-gray-db relative block">
          <input type="checkbox" :name="`${position}_${index}`" :id="`${position}_${index}`" class="invisible absolute">
          <label :for="`${position}_${index}`">
            <header class="py-3 cursor-pointer">
              <div class="relative flex justify-between items-center">
                <span class="font-semibold capitalize font-circular">{{position}}</span>
                <span class="flex">
                  <span class="text-xs text-gray-96 font-circular mr-2">{{parsedData.offices[position].length}} seats</span>
                  <img src="@/assets/img/chevron-down.svg" alt="chevron-down">
                </span>
              </div>
            </header>
          </label>
          <div class="mb-4 pr-12 quarter-view-accomplishment-detail">
            <div class="flex flex-wrap mb-2" v-for="(politician, index) in parsedData.offices[position]" :key="index">
              <span class="w-1/3 my-1 inline-block">{{politician.stateOfOrigin}}</span>
              <span class="w-2/3 my-1 inline-block">{{politician.name}}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- <pre>{{parsedData}}</pre> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'offices',
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      positions: [],
    };
  },
  computed: {
    parsedData() {
      const offices = {};
      const positions = [];

      this.data.forEach((politician) => {
        politician.politicalBackground.forEach((background) => {
          if (background.inOffice) {
            if (!positions.includes(background.position)) {
              positions.push(background.position);
            }

            if (Array.isArray(offices[background.position])) {
              offices[background.position].push(politician);
            } else {
              offices[background.position] = [politician];
            }
          }
        });
      });

      return {
        offices,
        positions,
      };
    },
  },
};
</script>

<style lang="scss">
</style>
