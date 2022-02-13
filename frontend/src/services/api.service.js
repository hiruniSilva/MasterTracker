import axios from 'axios';

const instance = axios.create({
  timeout: 30000
});

// instance.interceptors.request.use(function (config) {
//   const token = localStorage.getItem('accessToken');
//   config.headers.Authorization = token;
//   return config;
// });

export default instance;
