<template>
  <div class="flex flex-wrap">
    <div class="absolute top-0 left-0 flex flex-col justify-center w-full h-full bg-white opacity-90 z-40" v-if="uploading">
      <span class="loading lg mx-auto"></span>
      <p class="text-black text-center">Uploading...</p>
    </div>
    <div class="w-full">
      <div class="flex justify-center relative mx-auto block">
        <croppa v-model="croppa"></croppa>
      </div>
      <p class="mt-4 mb-2 text-sm">Click the "Choose Image" above. Once you select an image, you can:</p>
      <ul class="list-disc text-xs mb-4">
        <li>Drag image to desired centred view</li>
        <li>Pinch or scroll down to zoom in</li>
        <li>put fingers together and spread apart or scroll up to zoom out</li>
      </ul>
    </div>
    <div class="flex flex-wrap w-full">
      <button class="w-full md:w-1/2 btn-primary py-1 w-1/2" :disabled="uploading" @click="uploadCroppedImage">Upload</button>
      <button class="w-full md:w-1/2 bg-white py-1 w-1/2" :disabled="uploading" @click="$emit('cancel')">Cancel</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: '',
  computed: {
    ...mapGetters({
      user: 'user',
    }),
  },
  data() {
    return {
      croppa: {},
      uploading: false,
      usersService: this.$serviceFactory.users,
    };
  },
  methods: {
    ...mapActions({
      displayError: 'displayError',
      displaySuccess: 'displaySuccess',
    }),
    ...mapMutations({
      setCurrentUser: 'setCurrentUser',
    }),
    uploadCroppedImage() {
      this.uploading = true;
      this.croppa.generateBlob(
        async (blob) => {
          try {
            const data = new FormData();
            data.set('file', blob);

            const response = await this.usersService.updateUser(this.user.id, data);
            this.setCurrentUser(response.data.user);
            this.displaySuccess({
              message: 'Profile picture Updated Successfully.',
            });
            this.uploading = false;
            this.$emit('complete');
          } catch (error) {
            this.uploading = false;
            this.displayError({
              message: 'An error occured while updating your picture. Please try again later',
            });
          }
        },
        'image/*',
        0.8,
      );
    },
  },
};
</script>

<style lang="scss">
  .croppa-container {
    background-color: white;
    border: 3px solid #CE9833;
    border-radius: 50%;
    overflow: hidden;

    canvas {
      background-color: black;
      border: 3px solid white;
    }
  }
</style>
