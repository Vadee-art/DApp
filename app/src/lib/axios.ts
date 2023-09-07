import Axios, { InternalAxiosRequestConfig } from 'axios';

import { API_URL } from '@/config';
import storage from '@/utils/storage';
import { useNotificationStore } from '@/stores/notifications';

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const token = storage.getUser()?.token;
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  config.headers.Accept = 'application/json';
  return config;
}

export const axios = Axios.create({
  baseURL: API_URL,
  paramsSerializer: {
    indexes: null,
  },
});

export const axiosWithoutAuth = Axios.create({
  baseURL: API_URL,
  paramsSerializer: {
    indexes: null,
  },
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message: string =
      error.response?.data?.message || error.message || 'Something went wrong';
    useNotificationStore.getState().addNotification({
      type: 'danger',
      title: 'Error!',
      message,
    });
    return Promise.reject(message);
  }
);
axiosWithoutAuth.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message: string =
      error.response?.data?.message || error.message || 'Something went wrong';
    useNotificationStore.getState().addNotification({
      type: 'danger',
      title: 'Error!',
      message,
    });
    return Promise.reject(message);
  }
);
