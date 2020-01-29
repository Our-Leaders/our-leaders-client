import authServices from './authServices';
import careersServices from './careersServices';
import donationsService from './donationsService';
import pagesServices from './pagesServices';
import politiciansServices from './politiciansServices';
import politicalPartiesServices from './politicalPartiesServices';
import subscriptionsServices from './subscriptionsServices';
import usersServices from './usersServices';

const services = {
  auth: authServices,
  careers: careersServices,
  donations: donationsService,
  pages: pagesServices,
  politicalParties: politicalPartiesServices,
  politicians: politiciansServices,
  subscriptions: subscriptionsServices,
  users: usersServices,
};

export default services;
