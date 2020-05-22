import authServices from './authServices';
import careersServices from './careersServices';
import donationsService from './donationsService';
import feedsService from './feedsServices';
import notificationsServices from './notificationsServices';
import pagesServices from './pagesServices';
import politiciansServices from './politiciansServices';
import politicalPartiesServices from './politicalPartiesServices';
import subscriptionsServices from './subscriptionsServices';
import supportServices from './supportServices';
import usersServices from './usersServices';
import statisticsService from './statisticsService';

const services = {
  auth: authServices,
  careers: careersServices,
  donations: donationsService,
  feeds: feedsService,
  notifications: notificationsServices,
  pages: pagesServices,
  politicalParties: politicalPartiesServices,
  politicians: politiciansServices,
  subscriptions: subscriptionsServices,
  support: supportServices,
  users: usersServices,
  statistics: statisticsService,
};

export default services;
