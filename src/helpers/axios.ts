import axios, { AxiosRequestConfig } from 'axios';
const attachToken = (config: AxiosRequestConfig) => {
  const token = localStorage.getItem('token');

  config.headers = {
    ...config.headers,
    Authorization: token ? `Basic ${token}` : '',
    // withCredentials : !!token
  };

  console.log(config)
  return config;
};

axios.interceptors.request.use(attachToken);
