<template>
<div class="block relative">
  <div class="absolute h-full w-full politcian">
    <div class="inner h-full w-full">
      <button class="w-1/2 mx-auto border-2 leading border-white p-2 text-white hover:bg-white hover:text-black">
        See More
      </button>
    </div>
  </div>
  <div class="w-full overflow-hidden h-40">
    <img :src="politician.profileImage" class="w-full object-cover"/>
  </div>
  <div class="w-full my-2">
    <img class="inline-block mr-2 h-4" src="../assets/img/thumbs-up.svg"/>
    <span class="inline-block mr-4 h-4 align-middle text-sm">{{politician.vote.up}}</span>
    <img class="inline-block mr-2 h-4" src="../assets/img/thumbs-down.svg"/>
    <span class="inline-block mr-2 h-4 align-middle text-sm">{{politician.vote.down}}</span>
  </div>
  <h4 class="font-semibold text-lg">{{politician.name}}</h4>
  <h4 class="capitalize overflow-ellipse text-base">{{position}}</h4>
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
  .politcian {
    background-color: rgba(0, 0, 0, .5);
    border: 2px solid black;
    opacity: 0%;
    cursor: pointer;

    .inner {
      border: 4px solid white;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }

  .politcian:hover {
    opacity: 100%;
    transition: opacity 300ms linear;
  }
</style>
