import axios from 'axios';

/* 
    This file is not being used at the moment; the apiController is being used to forward 
    requests to the /api endpoint in the BFF.  However, it could be used later to send
    requests that are fulfilled directly by the node app that serves this app.

*/

const resourceController = axios.create({
  //baseURL: 'https://resource-controller.cloud.ibm.com/v2'
  baseURL: 'http://localhost:3100'
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