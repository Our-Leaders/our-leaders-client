export const userMutations = {
  clearCurrentUser(state) {
    state.currentUser = null;
  },
  setCurrentUser(state, user) {
    state.currentUser = user;
  },
  updateCurrentUser(state, args) {
    state.currentUser[args.key] = args.value;
  },
};

export const userGetters = {
  user: state => state.currentUser || {},
};
