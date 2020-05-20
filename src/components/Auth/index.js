import Vue from 'vue';

import DeleteAccountForm from '@/components/Auth/DeleteAccountForm.vue';
import ForgotPasswordForm from '@/components/Auth/ForgotPasswordForm.vue';
import PasswordResetForm from '@/components/Auth/PasswordResetForm.vue';
import SignInForm from '@/components/Auth/SignInForm.vue';
import SignUpForm from '@/components/Auth/SignUpForm.vue';
import VerifyForm from '@/components/Auth/VerifyForm.vue';

Vue.component('our-delete-account-form', DeleteAccountForm);
Vue.component('our-forgot-password-form', ForgotPasswordForm);
Vue.component('our-password-reset-form', PasswordResetForm);
Vue.component('our-sign-in-form', SignInForm);
Vue.component('our-sign-up-form', SignUpForm);
Vue.component('our-verify-form', VerifyForm);
