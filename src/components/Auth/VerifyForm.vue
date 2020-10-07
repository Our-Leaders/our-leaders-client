<template>
  <div>
    <p class="mb-10">
      Hello {{data.email}}, we're glad to have you.
      <br/>
      Why do we need this?,
      <br/>
      In order to keep suspicious accounts and activities off the platform, we require more information for verification purposes. Thank you for understanding!
    </p>
    <form @submit.prevent="verify">
      <div class="mb-6 w-full">
        <label class="block" for="phone">
          <span class="font-semibold">Phone number</span>
        </label>
        <div class="w-full input-fields">
          <span class="inline-block w-3/16">
              <select class="outline-none overflow-ellipse appearance-none" @change="setPrefix">
                <option v-for="(option, index) in phoneCodes" :key="index" :value="option.dial_code">
                  {{`${option.code} ${option.dial_code}`}}
                </option>
              </select>
          </span>
          <input
            class="'w-9/16 py-2 mb-1 pl-2 ml-1'"
            @blur="generateVerificationCode"
            type="tel"
            id="phone"
            name="phone"
            v-model="data.phone"
            :disabled="sending || codeSent"
            ref="phone"
            placeholder="Enter your number here"
            required>
          <div class="w-2/16 inline-block" v-if="sending">
            <span class="loading float-right"></span>
          </div>
          <button class="w-2/16 border-2 border-gray-600 cursor-pointer"
            v-if="codeSent"
            @click="editNumber">
            Edit
          </button>
        </div>
      </div>
      <div class="mb-6">
        <label :class="{
          'block font-semibold': true,
          'text-gray-300': !codeSent
          }" for="verification">
          Verification pin
          <span
            class="block cursor-pointer font-regular text-xs
            text-gray-500 float-right align-middle"
            @click="generateVerificationCode">
            Didn't receive a pin? Click to resend
          </span>
        </label>
        <input class="verification field w-full py-2"
          type="text"
          id="verification"
          name="verification"
          placeholder="••••"
          v-model="data.verificationCode"
          :maxlength="4"
          :disabled="!codeSent"
          required/>
      </div>
      <button
        :class="{
          'btn-primary w-full mb-8': true,
          'loading': loading,
        }"
        :disabled="loading || !codeSent">
        Verify
      </button>
      <button
        class="btn w-full mb-8"
        type="button"
        @click="signOut"
        :disabled="loading">
        Sign Out
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import phoneCodesList from '@/assets/json/phoneCodesList.json';

export default {
  name: 'our-verify-form',
  props: {
    goToHome: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      authServices: this.$serviceFactory.auth,
      codeSent: false,
      data: {
        email: null,
        phone: null,
        verificationCode: null,
      },
      loading: false,
      phoneCodes: phoneCodesList.phoneCodes,
      sending: false,
      prefix: phoneCodesList.phoneCodes[0].dial_code,
      selectedPhoneCode: {},
    };
  },
  created() {
    if (this.user) {
      this.data.phone = this.formatNumber(this.user.phoneNumber);
      this.data.email = this.user.email;
    }
    setTimeout(() => this.$refs.phone.focus(), 1000);
  },
  computed: {
    ...mapGetters([
      'user',
    ]),
  },
  methods: {
    ...mapActions([
      'displayError',
      'displaySuccess',
    ]),
    async generateVerificationCode() {
      if (!this.data.phone) {
        return;
      }

      try {
        this.sending = true;
        await this.authServices.sendVerificationCode(`${this.prefix}${this.data.phone}`);
        this.showSuccess('Verification code was successfully sent to your phone and email.');
        this.sending = false;
        this.codeSent = true;
      } catch (err) {
        this.sending = false;
        this.showError('An error occured while sending you a pin.');
      }
    },
    async verify() {
      try {
        this.loading = true;
        const response = await this.authServices.verifyNumber({
          verificationCode: this.data.verificationCode,
        });

        this.showSuccess('Phone number verified.');
        this.$store.commit('setCurrentUser', response.data.user);
        this.goToHome();
      } catch (err) {
        this.loading = false;
        this.showError('Phone number not verified.');
      }
    },
    editNumber() {
      this.codeSent = false;
    },
    formatNumber(number) {
      return number ? number.replace('+234', '') : number;
    },
    showError(message) {
      this.displayError(message);
    },
    showSuccess(message) {
      this.displaySuccess({ message });
    },
    signOut() {
      this.$store.commit('clearCurrentUser');
      this.$store.commit('clearJWT');
      this.$router.push('home');
      window.location.reload();
    },
    setPrefix(event) {
      this.prefix = event.target.value;
      this.selectedPhoneCode = this.phoneCodes.find(x => x.value === this.prefix);
    },
  },
};
</script>

<style lang="scss">
</style>
