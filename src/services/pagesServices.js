import instance from './services';

const resource = '/pages';

export default {
  getPages() {
    return instance.get(resource);
  },
};
