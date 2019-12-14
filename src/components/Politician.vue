<template>
<div class="block relative">
  <div class="absolute h-full w-full hidden-overflow">
    <div class="inner h-full w-full">
      <button class="w-1/2 mx-auto border-2 leading border-white p-2 text-white hover:bg-white hover:text-black">
        See More
      </button>
    </div>
  </div>
  <div class="w-full overflow-hidden h-20 md:h-32 lg:h-40">
    <img :src="politician.profileImage" class="w-full object-cover"/>
  </div>
  <div class="w-full my-1 md:my-2">
    <img class="inline-block mr-1 md:mr-2 h-3 md:h-4" src="../assets/img/thumbs-up.svg"/>
    <span class="inline-block mr-2 md:mr-4 h-3 md:h-4 align-middle text-xs md:text-sm">{{politician.vote.up}}</span>
    <img class="inline-block mr-1 md:mr-2 h-3 md:h-4" src="../assets/img/thumbs-down.svg"/>
    <span class="inline-block mr-1 md:mr-2 h-3 md:h-4 align-middle text-xs md:text-sm">{{politician.vote.down}}</span>
  </div>
  <h4 class="font-semibold text-base md:text-lg">{{politician.name}}</h4>
  <h4 class="capitalize overflow-ellipse text-sm md:text-base">{{position}}</h4>
</div>
</template>

<script>
export default {
  name: 'politician',
  props: {
    politician: {
      type: Object,
    },
  },
  computed: {
    position() {
      const background = this.politician.politicalBackground.find(x => x.inOffice);
      return `${background.position} of ${background.institution}`;
    },
  },
};
</script>

<style lang="scss">
</style>
