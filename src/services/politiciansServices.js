import instance from './services';
import stringUtil from '../helpers/stringUtil';

const resource = '/politicians';

export default {
  getPoliticians(filter) {
    return instance.get(stringUtil.buildQuery(resource, filter));
  },
};
