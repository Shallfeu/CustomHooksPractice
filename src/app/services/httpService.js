import axios from 'axios';
import logger from './logService';
import { toast } from 'react-toastify';
import config from '../config.json';

axios.defaults.baseURL = config.apiEndPoint;

axios.interceptors.response.use(
  (res) => res,
  (error) => {
    const expectedErros =
      error.response && error.response.status >= 400 && error.response.status < 500;

    if (!expectedErros) {
      logger.log(error);
      toast.error('Something went wrong. Try it later :)');
    }

    return Promise.reject(error);
  },
);

const httpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

export default httpService;
