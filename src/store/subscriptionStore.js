export const subscriptionMutations = {
  setSubscription(state, subscription) {
    state.subscription = subscription;
  },
};

export const subscriptionGetters = {
  subscription: state => state.subscription || null,
};
