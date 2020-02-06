export const politicianMutations = {
  addToViewedPoliticians(state, politician) {
    state.viewedPoliticians[politician.id] = politician;
  },
};

export const politicianGetters = {
  viewedPoliticians: state => state.viewedPoliticians,
};
