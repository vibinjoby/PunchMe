import axios from "axios";
import * as Sentry from "sentry-expo";

axios.interceptors.response.use(null, error => {
  if (
    error &&
    error.response &&
    error.response.status >= 400 &&
    error.response.status <= 500
  ) {
    Sentry.captureException(error.response.request._response);
  }
  if (
    error &&
    error.response &&
    error.response.request &&
    error.response.request._response
  )
    return Promise.reject(error.response.request._response);

  return Promise.reject(error);
});

function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt
};
