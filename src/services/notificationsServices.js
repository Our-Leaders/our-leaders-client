import instance from './services';

const resource = '/notifications';

export default {
  getNotifications() {
    return instance.get(resource);
  },
};
