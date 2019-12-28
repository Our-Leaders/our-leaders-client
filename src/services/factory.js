import authServices from './authServices';
import pagesServices from './pagesServices';
import politiciansServices from './politiciansServices';
import politicalPartiesServices from './politicalPartiesServices';
import subscriptionsServices from './subscriptionsServices';

const services = {
  auth: authServices,
  pages: pagesServices,
  politicalParties: politicalPartiesServices,
  politicians: politiciansServices,
  subscriptions: subscriptionsServices,
};

export default services;
