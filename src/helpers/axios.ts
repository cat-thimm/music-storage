import axios, { AxiosRequestConfig } from 'axios';
const attachToken = (config: any) => {
  const token = localStorage.getItem('token');

  config.headers = {
    ...config.headers,
    Authorization: token ? `Basic ${token}` : '',
  };

  return config;
};

axios.interceptors.request.use(attachToken);
