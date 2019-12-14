import authServices from './authServices';
import politiciansServices from './politiciansServices';
import politicalPartiesServices from './politicalPartiesServices';

const services = {
  auth: authServices,
  politicalParties: politicalPartiesServices,
  politicians: politiciansServices,
};

export default services;
