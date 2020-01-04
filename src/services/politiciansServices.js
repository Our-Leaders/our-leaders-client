import instance from './services';
import stringUtil from '../helpers/stringUtil';

const resource = '/politicians';

export default {
  getPolitician(id) {
    return instance.get(`${resource}/${id}`);
  },
  getPoliticians(filter) {
    return instance.get(stringUtil.buildQuery(resource, filter));
  },
  getTrendingPoliticians() {
    return instance.get(resource);
    // use instead
    // return instance.get(`${resource}/trending`);
  },
  voteForPolitician(id, data) {
    return instance.post(`${resource}/${id}/vote`, data);
  },
};
