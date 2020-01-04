import instance from './services';

const resource = '/users';

export default {
  getVotes(id) {
    return instance.get(`${resource}/${id}/votes`);
  },
};
