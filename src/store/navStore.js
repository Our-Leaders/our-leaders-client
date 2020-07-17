export const navActions = {
  setShrinkMode({ commit }, shrinkMode) {
    commit('setShrinkMode', shrinkMode);
  },
};

export const navMutations = {
  setShrinkMode(state, shrinkMode) {
    state.shrinkMode = shrinkMode;
  },
};

export const navGetters = {
  shrinkMode: state => state.shrinkMode || false,
};
