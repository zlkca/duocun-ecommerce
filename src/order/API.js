
import { Http, HttpStatus } from '../API';


export class OrderAPI {
  url = 'Orders';
  http = new Http();

  insertOne(order) {
    const url = this.url;
    return new Promise((resolve, reject) => {
      this.http.post(url, order).then(rsp => {
        if (rsp.status === HttpStatus.OK.code) {
          resolve(rsp.data);
        } else {
          resolve();
        }
      });
    });
  }

  placeOrders(orders){
    const url = this.url + '/bulk';
    return new Promise((resolve, reject) => {
      this.http.post(url, orders).then(rsp => {
        if (rsp.status === HttpStatus.OK.code) {
          resolve(rsp.data);
        } else {
          resolve();
        }
      });
    });
  }

  quickFind(query = null, fields = null) {
    const http = new Http();
    return new Promise((resolve, reject) => {
      http.get(this.url + '/qFind', query, fields).then(rsp => {
        if (rsp.status === http.Status.OK.code) {
          resolve(rsp.data);
        } else {
          resolve();
        }
      });
    });
  }

}
