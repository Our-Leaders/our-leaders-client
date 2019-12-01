export const userMutations = {
  clearCurrentUser(state) {
    state.currentUser = null;
  },
  setCurrentUser(state, user) {
    state.currentUser = user;
  },
};

export const userGetters = {
  user: state => state.currentUser,
};
