import axios from 'axios';

/*
    This controller is running in the client-side React app.  That app is served up from a node.js application that also 
    serves up an api endpoint that acts as a proxy to the backend API application.  Therefore, the URL we use here to get
    to the API has the same hostname as this application.  

    However, if it is running locally, the React app (/client/npm start) runs on port 3000, the node app runs on port 3100
    and the backend app (not in this project) runs on port 3001.  In that scenario we have to manually set the apiUrl to
    the right value here.

*/

const apiUrl = process.env.NODE_ENV === 'development' ?  'http://localhost:3100' : `https://${window.location.hostname}`;
console.log('[apiController.js] apiUrl is ' + apiUrl, window.location);

const apiController = axios.create({
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