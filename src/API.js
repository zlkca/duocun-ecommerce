import axios from 'axios';
import Cookies from 'js-cookie';

export const HttpStatus = {
  OK: { code: 200, text: 'OK' }
};

export class Http {
  authPrefix = '';
  Status = {
    OK: { code: 200, text: 'OK' }
  };
  get(path, query = null, fields = null) {
    const accessTokenId = Cookies.get('duocun-token-id');
    const headers = {};
    if (accessTokenId) {
      headers['Authorization'] = this.authPrefix + accessTokenId;
    }
    if (query) {
      headers['filter'] = JSON.stringify(query);
    }
    if (fields) {
      headers['fields'] = JSON.stringify(fields);
    }
    // const head =  {headers: {"x-dsi-restful": 1}};
    const url = 'http://localhost:8000/api/' + path;
    return new Promise((resolve, reject) => {
      axios.get(url, {headers: headers})
        .then(json => {
          resolve({ data: json.data, status: json.status, statusText: json.statusText });
        });
    });
  }


  post(path, data, query=null, fields=null) {
    const accessTokenId = Cookies.get('duocun-token-id');
    const headers = {};
    if (accessTokenId) {
      headers['Authorization'] = this.authPrefix + accessTokenId;
    }
    if (query) {
      headers['filter'] = JSON.stringify(query);
    }
    if (fields) {
      headers['fields'] = JSON.stringify(fields);
    }

    const url = 'http://localhost:8000/api/' + path;
    return new Promise((resolve, reject) => {
      axios.post(url, data, {headers: headers})
        .then(json => {
          resolve({ data: json.data, status: json.status, statusText: json.statusText });
        });
    });
  }
}