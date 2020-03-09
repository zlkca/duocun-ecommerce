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

  search(keyword = null, fields = null) {
    const http = new Http();
    return new Promise((resolve, reject) => {
      const url = encodeURI(this.url + '/Places/' + keyword);
      http.get(url, null, fields).then(rsp => {
        if (rsp.status === http.Status.OK.code) {
          resolve(rsp.data);
        } else {
          resolve();
        }
      });
    });
  }

  getAddressString(location) {
    if (location) {
      const city = location.subLocality ? location.subLocality : location.city;
      const province = this.toProvinceAbbr(location.province);
      const streetName = this.toStreetAbbr(location.streetName);
      return location.streetNumber + ' ' + streetName + ', ' + city + ', ' + province;
    } else {
      return '';
    }
  }

  toProvinceAbbr(input, to = 'abbr') {
    const provinces = [
      ['Alberta', 'AB'],
      ['British Columbia', 'BC'],
      ['Manitoba', 'MB'],
      ['New Brunswick', 'NB'],
      ['Newfoundland', 'NF'],
      ['Northwest Territory', 'NT'],
      ['Nova Scotia', 'NS'],
      ['Nunavut', 'NU'],
      ['Ontario', 'ON'],
      ['Prince Edward Island', 'PE'],
      ['Quebec', 'QC'],
      ['Saskatchewan', 'SK'],
      ['Yukon', 'YT'],
    ];

    const states = [
      ['Alabama', 'AL'],
      ['Alaska', 'AK'],
      ['American Samoa', 'AS'],
      ['Arizona', 'AZ'],
      ['Arkansas', 'AR'],
      ['Armed Forces Americas', 'AA'],
      ['Armed Forces Europe', 'AE'],
      ['Armed Forces Pacific', 'AP'],
      ['California', 'CA'],
      ['Colorado', 'CO'],
      ['Connecticut', 'CT'],
      ['Delaware', 'DE'],
      ['District Of Columbia', 'DC'],
      ['Florida', 'FL'],
      ['Georgia', 'GA'],
      ['Guam', 'GU'],
      ['Hawaii', 'HI'],
      ['Idaho', 'ID'],
      ['Illinois', 'IL'],
      ['Indiana', 'IN'],
      ['Iowa', 'IA'],
      ['Kansas', 'KS'],
      ['Kentucky', 'KY'],
      ['Louisiana', 'LA'],
      ['Maine', 'ME'],
      ['Marshall Islands', 'MH'],
      ['Maryland', 'MD'],
      ['Massachusetts', 'MA'],
      ['Michigan', 'MI'],
      ['Minnesota', 'MN'],
      ['Mississippi', 'MS'],
      ['Missouri', 'MO'],
      ['Montana', 'MT'],
      ['Nebraska', 'NE'],
      ['Nevada', 'NV'],
      ['New Hampshire', 'NH'],
      ['New Jersey', 'NJ'],
      ['New Mexico', 'NM'],
      ['New York', 'NY'],
      ['North Carolina', 'NC'],
      ['North Dakota', 'ND'],
      ['Northern Mariana Islands', 'NP'],
      ['Ohio', 'OH'],
      ['Oklahoma', 'OK'],
      ['Oregon', 'OR'],
      ['Pennsylvania', 'PA'],
      ['Puerto Rico', 'PR'],
      ['Rhode Island', 'RI'],
      ['South Carolina', 'SC'],
      ['South Dakota', 'SD'],
      ['Tennessee', 'TN'],
      ['Texas', 'TX'],
      ['US Virgin Islands', 'VI'],
      ['Utah', 'UT'],
      ['Vermont', 'VT'],
      ['Virginia', 'VA'],
      ['Washington', 'WA'],
      ['West Virginia', 'WV'],
      ['Wisconsin', 'WI'],
      ['Wyoming', 'WY'],
    ];
    const regions = states.concat(provinces);
    const camelcase = input.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    const uppercase = input.toUpperCase();
    if (to === 'abbr') {
      for (let i = 0; i < regions.length; i++) {
        if (regions[i][0] === camelcase) {
          return (regions[i][1]);
        } else if (regions[i][1] === uppercase) {
          return regions[i][1];
        }
      }
    } else if (to === 'name') {
      for (let i = 0; i < regions.length; i++) {
        if (regions[i][1] === uppercase) {
          return (regions[i][0]);
        } else if (regions[i][0] === camelcase) {
          return regions[i][0];
        }
      }
    }
  }

  toStreetAbbr(streetName) {
    return streetName.replace(' Street', ' St').replace(' Avenue', ' Ave');
  }
}
