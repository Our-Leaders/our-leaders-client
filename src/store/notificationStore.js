import StringUtil from '../helpers/stringUtil';

export const notificationActions = {
  clearNotifications(context) {
    context.commit('clearNotifications');
  },
  displayError(context, data) {
    context.commit('showError', data);
    setTimeout(() => context.commit('hideMessage'), 3000);
  },
  displayInfo(context, data) {
    context.commit('showInfo', data);
    setTimeout(() => context.commit('hideMessage'), 3000);
  },
  displayCustomInfo(context, data) {
    context.commit('showCustomInfo', data);
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
  setNotifications(context, data) {
    context.commit('addNotifications', data);
  },
  toggleNotificationRead(context, data) {
    context.commit('updateNotification', data);
  },
};

export const notificationGetters = {
  notifications: state => state.notifications.sort((a, b) => {
    if (a.read && !b.read) {
      return 1;
    }
    return -1;
  }),
};

export const notificationMutations = {
  addNotifications(state, data) {
    data.forEach((x) => {
      state.notifications.unshift(x);
    });
  },
  clearNotifications(state) {
    state.notifications = [];
  },
  hideMessage(state) {
    state.info.display = false;
  },
  hideSignUp(state) {
    state.info.displaySignUp = false;
  },
  showError(state, data) {
    notificationMutations.showCustomInfo(state, {
      header: 'Uh Oh!',
      message: StringUtil.getErrorText(data),
      type: 'error',
    });
  },
  showInfo(state, data) {
    notificationMutations.showCustomInfo(state, {
      header: 'Attention!',
      message: data.message,
      type: 'info',
    });
  },
  showSignUp(state) {
    state.info.displaySignUp = true;
  },
  showSuccess(state, data) {
    notificationMutations.showCustomInfo(state, {
      header: 'Success!',
      message: data.message,
      type: 'success',
    });
  },
  showCustomInfo(state, data) {
    state.info.header = data.header;
    state.info.details = data.message;
    state.info.type = data.type;
    state.info.display = true;
  },
  updateNotification(state, index) {
    state.notifications[index].read = true;
  },
};
