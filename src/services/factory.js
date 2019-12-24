import authServices from './authServices';
import politiciansServices from './politiciansServices';
import politicalPartiesServices from './politicalPartiesServices';
import subscriptionsServices from './subscriptionsServices';

const services = {
  auth: authServices,
  politicalParties: politicalPartiesServices,
  politicians: politiciansServices,
  subscriptions: subscriptionsServices,
};

export default services;
