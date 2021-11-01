import axiosInstance from 'axios';
import { createBrowserHistory } from 'history';
export const history = createBrowserHistory();

const baseURL = process.env.REACT_APP_BASE_URL;

axiosInstance.defaults.baseURL = baseURL;

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.token;
    if (token) {
      config.headers['token'] = token;
    }
    // config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

//Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      (originalRequest._retry || originalRequest.url === `${baseURL}/auth/refresh`)
    ) {
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
      history.push('/logout');
      return Promise.reject(error);
    } else if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refresh_token = localStorage.getItem('refresh_token');
      if (!refresh_token) {
        history.push('/logout');
        return Promise.reject(error);
      }
      return axiosInstance
        .post(`${baseURL}/auth/refresh`, {
          refresh_token,
        })
        .then((res) => {
          if (res.status === 200) {
            const { token: new_token, refresh_token: new_refresh_token } = res.data;
            localStorage.setItem('token', new_token);
            localStorage.setItem('refresh_token', new_refresh_token);
            axiosInstance.defaults.headers.common['token'] = new_token;
            return axiosInstance(originalRequest);
          }
        });
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
