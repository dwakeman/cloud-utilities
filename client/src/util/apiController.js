import axios from 'axios';

const apiUrl = process.env.NODE_ENV === 'development' ?  'http://localhost:3100' : `https://${window.location.hostname}`;
console.log('[apiController.js] apiUrl is ' + apiUrl, window.location);

const apiController = axios.create({
  //baseURL: 'https://resource-controller.cloud.ibm.com/v2'
  baseURL: apiUrl
});

apiController.defaults.headers.common['Authorization'] = 'AUTH_TOKEN_INSTANCE';

apiController.interceptors.request.use(request => {
  console.log('[axios.js] axios.interceptors.request', request);
  //you can edit the request config here.....
  return request;
}, error => {
  console.log(error);
  return Promise.reject(error);

});

//instance.interceptors.request......

/*
    A good example where this might be effective is to set up separate instances for different
    APIs provided by IBM Cloud.  They could all share the global auth header, but each one would
    have a different base URL and perhaps other specific headers.  Like Key Protect has a unique
    custom header that it requires.....
*/
export default apiController;