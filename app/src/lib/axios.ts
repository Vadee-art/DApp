import Axios, { InternalAxiosRequestConfig } from 'axios';

import { API_URL } from '../config';

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const token = 'token';
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  config.headers.Accept = 'application/json';
  return config;
}

export const axios = Axios.create({
  baseURL: API_URL,
});

export const axiosWithoutAuth = Axios.create({
  baseURL: API_URL,
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // const message = error.response?.data?.message || error.message;
    return Promise.reject(error);
  }
);
axiosWithoutAuth.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // const message = error.response?.data?.message || error.message;
    return Promise.reject(error);
  }
);
