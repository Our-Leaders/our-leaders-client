/**
 * Created by bolor on 5/22/2020
 */

import instance from './services';

const resource = '/statistics';

export default {
  recordVisit(data) {
    return instance.post(`${resource}/visit`, data);
  },
};
