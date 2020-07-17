import instance from './services';

const resource = '/support';

export default {
  sendContactUsMessage(data) {
    return instance.post(`${resource}/message`, data);
  },
};
