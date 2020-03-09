import { Http, ResponseStatus } from '../API';

export class LocationAPI {
  url = 'Locations';

  find(query = null, fields = null) {
    const http = new Http();
    return new Promise((resolve, reject) => {
      http.get(this.url, query, fields).then(rsp => {
        if (rsp.status === http.Status.OK.code) {
          resolve(rsp.data);
        } else {
          resolve();
        }
      });
    });
  }
}
