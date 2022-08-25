import axios from 'axios';

const instance = axios.create();

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    const conf = config;
    conf.headers = config.headers || {};
    conf.headers.requestStartedAt = String(new Date().getTime());
    return conf;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response) => {
    const resp = response;
    const conf = resp.config;
    conf.headers = resp.config.headers || {};
    conf.headers.requestEndedAt = String(new Date().getTime());
    resp.config = conf;
    return resp;
  },
  (error) => Promise.reject(error),
);

export default instance;
