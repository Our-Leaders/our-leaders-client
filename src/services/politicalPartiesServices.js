import instance from './services';
import stringUtil from '../helpers/stringUtil';

const resource = '/political-party';

export default {
  getPoliticalParty(id) {
    return instance.get(`${resource}/${id}`);
  },
  getPoliticalParties(filter) {
    return instance.get(stringUtil.buildQuery(resource, filter));
  },
};
