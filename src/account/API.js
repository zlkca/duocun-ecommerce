import { Http, HttpStatus } from '../API';
import Cookies from 'js-cookie';

const COOKIE_EXPIRY_DAYS = 365;

export class AccountAPI {
  url = 'Accounts';
  http = new Http();

  setAccessTokenId(token) {
    const oldToken = this.getAccessTokenId();
    if(oldToken){
      Cookies.remove('duocun-token-id');
    }
    if (token) {
      Cookies.set('duocun-token-id', token, { expires: COOKIE_EXPIRY_DAYS });
    }
  }

  getAccessTokenId() {
    const tokenId = Cookies.get('duocun-token-id');
    return tokenId ? tokenId : null;
  }

  getCurrentAccount() {
    const accessTokenId = this.getAccessTokenId();
    const url = this.url + '/current' + '?tokenId=' + accessTokenId;

    return new Promise((resolve, reject) => {
      this.http.get(url).then(rsp => {
        if (rsp.status === HttpStatus.OK.code) {
          resolve(rsp.data);
        } else {
          resolve();
        }
      });
    });
  }

  wxLogin(authCode) {
    const url = this.url + '/wxLogin?code=' + authCode;
    return new Promise((resolve, reject) => {
      this.http.get(url).then(rsp => {
        if (rsp.status === HttpStatus.OK.code) {
          resolve(rsp.data);
        } else {
          reject();
        }
      });
    });
  }

  find(query = null, fields = null) {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + '/qFind', query, fields).then(rsp => {
        if (rsp.status === HttpStatus.OK.code) {
          resolve(rsp.data);
        } else {
          resolve();
        }
      });
    });
  }


  // d --- accountId, phone, lang: 'en' or 'zh'
  // return tokenId if (signup) success, otherwise return ''
  sendVerifyMsg(accountId, phone, lang){
    const url = this.url + '/sendVerifyMsg';
    const data = {accountId, phone, lang};
    return new Promise((resolve, reject) => {
      this.http.post(url, data).then(rsp => {
        if (rsp.status === HttpStatus.OK.code) {
          resolve(rsp.data);
        } else {
          resolve();
        }
      });
    });
  }

  verifyAndLogin(phone, code, accountId){
    const url = this.url + '/verifyAndLogin';
    const data = {accountId, phone, code};
    return new Promise((resolve, reject) => {
      this.http.post(url, data).then(rsp => {
        if (rsp.status === HttpStatus.OK.code) {
          resolve(rsp.data);
        } else {
          resolve();
        }
      });
    });
  }

  verifyCode(phone, code){
    const url = this.url + '/verifyCode';
    const data = {phone, code};
    return new Promise((resolve, reject) => {
      this.http.post(url, data).then(rsp => {
        if (rsp.status === HttpStatus.OK.code) {
          resolve(rsp.data);
        } else {
          resolve();
        }
      });
    });
  }

  signup(phone, verificationCode){
    const url = this.url + '/signup';
    const data = {phone, verificationCode};
    return new Promise((resolve, reject) => {
      this.http.post(url, data).then(rsp => {
        if (rsp.status === HttpStatus.OK.code) {
          resolve(rsp.data);
        } else {
          resolve();
        }
      });
    });
  }

  // login --- return string tokenId
  login(username, password) {
    const data = {username,password};
    const url = this.url + '/login';
    return new Promise((resolve, reject) => {
      this.http.post(url, data).then(rsp => {
        if (rsp.status === HttpStatus.OK.code) {
          resolve(rsp.data);
        } else {
          resolve();
        }
      });
    });
  }

  loginByPhone(phone, verificationCode) {
    const url = this.url + '/loginByPhone';
    const data = {phone, verificationCode};
    return new Promise((resolve, reject) => {
      this.http.post(url, data).then(rsp => {
        if (rsp.status === HttpStatus.OK.code) {
          resolve(rsp.data);
        } else {
          resolve();
        }
      });
    });
  }

  logout() {
    // const state = this.ngRedux.getState();
    // if (state && state._id) {
    //   this.ngRedux.dispatch({ type: AccountActions.UPDATE, payload: new Account() });
    // }
    const url = this.url + '/logout';
    const data = {};
    return new Promise((resolve, reject) => {
      this.http.post(url, data).then(rsp => {
        if (rsp.status === HttpStatus.OK.code) {
          resolve(rsp.data);
        } else {
          resolve();
        }
      });
    });
  }
}
