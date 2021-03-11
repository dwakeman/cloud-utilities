import axios from 'axios';

const resourceController = axios.create({
  //baseURL: 'https://resource-controller.cloud.ibm.com/v2'
  baseURL: 'http://localhost:3000'
});

resourceController.defaults.headers.common['Authorization'] = 'AUTH_TOKEN_INSTANCE';

resourceController.interceptors.request.use(request => {
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
export default resourceController;