import instance from './services';
import stringUtil from '../helpers/stringUtil';

const resource = '/jobs';

export default {
  applyForJob(id, data) {
    return instance.post(`${resource}/${id}`, data);
  },
  getJobs(query) {
    return instance.get(stringUtil.buildQuery(resource, query));
  },
};
