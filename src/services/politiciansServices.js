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
};
