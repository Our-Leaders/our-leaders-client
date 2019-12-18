import ValidatorUtil from '../helpers/validatorUtil';

export const authMutations = {
  clearJWT(state) {
    state.jwtToken = null;
  },
  setJWT(state, jwt) {
    state.jwtToken = jwt;
  },
};

export const authGetters = {
  isLoggedIn: state => ValidatorUtil.isDefined(state.jwtToken),
  jwt: state => state.jwtToken,
};
