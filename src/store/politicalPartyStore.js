export const politicalPartyActions = {
  setPoliticalParty(context, politicalParty) {
    context.commit('setPoliticalParty', politicalParty);
  },
};

export const politicalPartyMutations = {
  setPoliticalParty(state, politicalParty) {
    state.politicalParty = politicalParty;
  },
};

export const politicalPartyGetters = {
  politicalParty: state => state.politicalParty,
};
