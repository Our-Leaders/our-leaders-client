import instance from './services';
import stringUtil from '../helpers/stringUtil';

const resource = '/jobs';

export default {
  getJobs(query) {
    return instance.get(stringUtil.buildQuery(resource, query));
  },
};
