import UtilService from '../Global/UtilService';
// import AuthService from './Controllers/AuthService';
import errorHandler from '../lib/errorHandler.js';

class ApiService {

  static query(method, api, body) {
    let params = {
      method
    }
    
    if(body) {
      if(method === 'get') {
        api+="?"+UtilService.objectToUrl(body);
      } else {
       
        params.body =JSON.stringify(body)
      }
    }
    // if(token !== '') {
      params.headers = {
        'Content-Type': 'application/json' ,
        // 'token':token
      }
    // }
      // else{
        params.headers = {
          'Content-Type': 'application/json' 
        }
      // }
    

    console.log(`API REQUEST: ${method} ${process.env.REACT_APP_API_BASE_URL}${api}`, params);

    return fetch(`${process.env.REACT_APP_API_BASE_URL}${api}`, params)
      .then(res => {
        if(!res.ok) {
          throw res;
        }
        return res;
      })
      .then(res => {
        return res.json();
      })
      .then(data => {
        return data;
      })
      .catch(error => {
        if(error instanceof TypeError) {
         
          throw new errorHandler('E_CONNECTION_FAILED', 500,"API connection error",error,);
        }
        else {
          return error.json().then(message => {
            if(message.status === 403) {
              // AuthService.logOut();
              window.location.reload(false);
             }
            if(message.status === 500) {}
            throw new errorHandler(message.code, error.status, message.message, message.data);
          })
        }
      })
  }
 
  static querySavaData(method, api, body) {
    let params = {
      method
    }
    
    if(body) {
        params.body =body
    }
    // if(token !== '') {
    //   params.headers = {
    //     'token':token
    //   }
    // }
    

    console.log(`API REQUEST: ${method} ${process.env.REACT_APP_API_BASE_URL}${api}`, params);

    return fetch(`${process.env.REACT_APP_API_BASE_URL}${api}`, params)
      .then(res => {
        if(!res.ok) {
          throw res;
        }
        return res;
      })
      .then(res => {
        return res.json();
      })
      .then(data => {
        return data;
      })
      .catch(error => {
        if(error instanceof TypeError) {         
          throw new errorHandler('E_CONNECTION_FAILED', 500,"API connection error",error,);
        }
        else {
          return error.json().then(message => {
            if(message.status === 403) {
              // AuthService.logOut();
              window.location.reload(false);
             }
            if(message.status === 500) {}
            throw new errorHandler(message.code, error.status, message.message, message.data);
          })
        }
      })
  }
 
  static post(api, body) {
    return ApiService.query('POST', api, body);
  }
  // static postSaveData(api, body, token="") {
  //   return ApiService.querySavaData('POST', api, body, token);
  // }
  // static putSaveData(api, body, token="") {
  //   return ApiService.querySavaData('PUT', api, body, token);
  // }

  // static put(api, body, token="") {
  //   return ApiService.query('PUT', api, body, token);
  // }

  // static delete(api, body, token="") {
  //   return ApiService.query('DELETE', api, body, token);
  // }

  // static get(api, body, token="") {
  //   return ApiService.query('GET', api, body, token);
  // }

  // static signIn(email, password) {
  //   return ApiService.post("api/auth/login", {email, password});
  // }

  // static whoami(token) {
  //   return ApiService.get("account/whoami", null, token);
  // }
}

export default ApiService;
