import axios from 'axios';
const BASE_URL = 'http://localhost:5000/api';

export const getStations = ()       => axios.get(BASE_URL + '/stations');
export const getSessions = ()       => axios.get(BASE_URL + '/sessions');
export const getPayments = ()       => axios.get(BASE_URL + '/payments');
export const getTickets  = ()       => axios.get(BASE_URL + '/tickets');
export const addStation  = (data)   => axios.post(BASE_URL + '/stations', data);
export const endSession  = (id, kw) => axios.put(BASE_URL + '/sessions/' + id + '/end', { total_kwh_delivered: kw });
export const closeTicket = (id)     => axios.put(BASE_URL + '/tickets/' + id);
export const addTicket   = (data)   => axios.post(BASE_URL + '/tickets', data);

export const getDiscoms  = ()       => axios.get(BASE_URL + '/discoms');
export const addDiscom   = (data)   => axios.post(BASE_URL + '/discoms', data);

export const getUsers    = ()       => axios.get(BASE_URL + '/users');
export const addUser     = (data)   => axios.post(BASE_URL + '/users', data);

export const getVehicles     = ()     => axios.get(BASE_URL + '/vehicles');
export const addVehicle      = (data) => axios.post(BASE_URL + '/vehicles', data);

export const getTransformers = ()     => axios.get(BASE_URL + '/transformers');
export const addTransformer  = (data) => axios.post(BASE_URL + '/transformers', data);

export const getConnectors   = ()     => axios.get(BASE_URL + '/connectors');
export const addConnector    = (data) => axios.post(BASE_URL + '/connectors', data);

export const getEnergyMeters = ()     => axios.get(BASE_URL + '/energymeters');
export const addEnergyMeter  = (data) => axios.post(BASE_URL + '/energymeters', data);

export const getTariffPlans  = ()     => axios.get(BASE_URL + '/tariffplans');
export const addTariffPlan   = (data) => axios.post(BASE_URL + '/tariffplans', data);
