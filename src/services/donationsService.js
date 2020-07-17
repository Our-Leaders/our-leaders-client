import instance from './services';

const resource = '/transactions';

export default {
  initiateTransaction(data) {
    return instance.post(`${resource}/initialize`, data);
  },
};
