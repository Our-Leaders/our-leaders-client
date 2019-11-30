export const authMutations = {
  clearJWT(state) {
    state.jwtToken = null;
  },
  setJWT(state, jwt) {
    state.jwtToken = jwt;
  },
};

export const authGetters = {
  isLoggedIn: state => state.jwtToken !== null,
  jwt: state => state.jwtToken,
};
