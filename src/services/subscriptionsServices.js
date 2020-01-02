import instance from './services';
import StringUtil from '../helpers/stringUtil';

const resource = '/subscriptions';

export default {
  addSubscription(data) {
    return instance.post(`${resource}`, data);
  },
  checkSubscription(id) {
    return instance.get(`${resource}/check/${id}`);
  },
  getSubscriptions(filter) {
    return instance.get(`${StringUtil.buildQuery(resource, filter)}`);
  },
  removeSubscription(id) {
    return instance.delete(`${resource}/${id}`);
  },
};
