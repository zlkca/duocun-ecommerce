import { Http } from '../API';
import Cookies from 'js-cookie';

export class AccountAPI {
  url = 'Accounts';
  
  getCurrentAccount() {
    const accessTokenId = Cookies.get('duocun-staff-token-id');
    const url = this.url + '/current' + '?tokenId=' + accessTokenId;
    const http = new Http();

    return new Promise((resolve, reject) => {
      http.get(url).then(rsp => {
        if (rsp.status === http.Status.OK.code) {
          resolve(rsp.data);
        } else {
          resolve();
        }
      });
    });
  }
}
