import StringUtil from '../helpers/stringUtil';

export const notificationActions = {
  displayError(context, data) {
    context.commit('showError', data);
    setTimeout(() => context.commit('hideMessage'), 3000);
  },
  displayInfo(context, data) {
    context.commit('showInfo', data);
    setTimeout(() => context.commit('hideMessage'), 3000);
  },
  displaySignUp(context) {
    context.commit('showSignUp');
  },
  displaySuccess(context, data) {
    context.commit('showSuccess', data);
    setTimeout(() => context.commit('hideMessage'), 3000);
  },
  hideSignUp(context) {
    context.commit('hideSignUp');
  },
};

export const notificationMutations = {
  hideMessage(state) {
    state.info.display = false;
  },
  hideSignUp(state) {
    state.info.displaySignUp = false;
  },
  showError(state, data) {
    state.info.header = 'Uh Oh!';
    state.info.details = StringUtil.getErrorText(data);
    state.info.type = 'error';
    state.info.display = true;
  },
  showInfo(state, data) {
    state.info.header = 'Attention!';
    state.info.details = data.message;
    state.info.type = 'info';
    state.info.display = true;
  },
  showSignUp(state) {
    state.info.displaySignUp = true;
  },
  showSuccess(state, data) {
    state.info.header = 'Success!';
    state.info.details = data.message;
    state.info.type = 'success';
    state.info.display = true;
  },
};
