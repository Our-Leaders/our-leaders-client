import instance from './services';

const resource = '/users';

export default {
  getVotes(id) {
    return instance.get(`${resource}/${id}/votes`).then((response) => {
      const votes = response.data.votes.map((x) => {
        const vote = x;
        const index = x.voters.findIndex(y => y.id === id);
        vote.voted = x.voters[index];
        return vote;
      });

      return {
        data: {
          votes,
        },
      };
    });
  },
  updateUser(id, data) {
    return instance.put(`${resource}/${id}`, data);
  },
  deleteAccount(id, data) {
    return instance.put(`${resource}/${id}/delete-my-account`, data);
  },
};
