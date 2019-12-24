import instance from './services';
import stringUtil from '../helpers/stringUtil';

const resource = '/subscriptions';

export default {
  addSubscription(data) {
    return instance.post(`${resource}`, data);
  },
  checkSubscription(id) {
    return instance.get(`${resource}/check/${id}`);
  },
  getSubscriptions() {
    return instance.get(`${resource}`);
  },
  removeSubscription(id) {
    return instance.delete(`${resource}/${id}`);
  },
};
