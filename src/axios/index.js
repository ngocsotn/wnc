import axiosInstance from 'axios';
import { createBrowserHistory } from 'history';
export const history = createBrowserHistory();

const baseURL = process.env.REACT_APP_BASE_URL;

axiosInstance.defaults.baseURL = baseURL;

axiosInstance.interceptors.request.use(
  (config) => {
    const access_token = localStorage.access_token;
    if (access_token) {
      config.headers['token'] = access_token;
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
      localStorage.removeItem('access_token');
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
            const { access_token: new_access_token, refresh_token: new_refresh_token } = res.data;
            localStorage.setItem('access_token', new_access_token);
            localStorage.setItem('refresh_token', new_refresh_token);
            axiosInstance.defaults.headers.common['token'] = new_access_token;
            return axiosInstance(originalRequest);
          }
        });
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
