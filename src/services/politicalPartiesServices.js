import instance from './services';
import stringUtil from '../helpers/stringUtil';

const resource = '/political-party';

export default {
  getPoliticalParties(filter) {
    return instance.get(stringUtil.buildQuery(resource, filter));
  },
};
