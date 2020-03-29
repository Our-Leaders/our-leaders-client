import instance from './services';

const resource = '/auth';

export default {
  login(data) {
    return instance.post(`${resource}/login`, data);
  },
  sendVerificationCode(phoneNumber) {
    return instance.get(`${resource}/verify?phoneNumber=${phoneNumber}`);
  },
  signUp(data) {
    return instance.post(`${resource}/signup`, data);
  },
  verifyNumber(data) {
    return instance.post(`${resource}/verify`, data);
  },
  requestPasswordReset(data) {
    return instance.post(`${resource}/request-reset`, data);
  },
};
