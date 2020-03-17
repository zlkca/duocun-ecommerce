import { Http, HttpStatus } from '../API';

export const PaymentError = {
  NONE: 'N',
  PHONE_EMPTY: 'PE',
  LOCATION_EMPTY: 'LE',
  DUPLICATED_SUBMIT: 'DS',
  CART_EMPTY: 'CE',
  BANK_CARD_EMPTY: 'BE',
  INVALID_BANK_CARD: 'IB',
  BANK_CARD_FAIL: 'BF',
  WECHATPAY_FAIL: 'WF'
};

export class PaymentAPI {
  url = 'ClientPayments';
  http = new Http();

  // order --- when order == null, add credit, when order != null, pay order
  payByCreditCard(accountId, accountName, orders, amount, note) {
    const url = this.url + '/payByCreditCard';
    return new Promise((resolve, reject) => {
      const data = { accountId, accountName, orders, amount, note };
      this.http.post(url, data).then(rsp => {
        if (rsp.status === HttpStatus.OK.code) {
          resolve(rsp.data);
        } else {
          resolve();
        }
      });
    });
  }

  // order --- when order == null, add credit, when order != null, pay order
  payBySnappay(accountId, accountName, orders, amount, note) {
    const url = this.url + '/payBySnappay';
    return new Promise((resolve, reject) => {
      const data = { accountId, accountName, orders, amount, note };
      this.http.post(url, data).then(rsp => {
        if (rsp.status === HttpStatus.OK.code) {
          resolve(rsp.data);
        } else {
          resolve();
        }
      });
    });
  }

  // deprecated
  snappayAddCredit(account, paid, paymentMethod, note){
    const url = this.url + '/snappayAddCredit';
    return new Promise((resolve, reject) => {
      const data = { account, paid, paymentMethod, note };
      this.http.post(url, data).then(rsp => {
        if (rsp.status === HttpStatus.OK.code) {
          resolve(rsp.data);
        } else {
          resolve();
        }
      });
    });
  }

  // deprecated
  snappayPayOrder( order, paid) {
    const url = this.url + '/snappayPayOrder';
    return new Promise((resolve, reject) => {
      const data = { order, paid };
      this.http.post(url, data).then(rsp => {
        if (rsp.status === HttpStatus.OK.code) {
          resolve(rsp.data);
        } else {
          resolve();
        }
      });
    });
  }

  // deprecated
  vaildateCardPay(stripe, card, htmlErrorId) {
    return new Promise((resolve, reject) => {
      if (card._empty) {
        resolve({ err: PaymentError.BANK_CARD_EMPTY, chargeId: '', msg: 'empty card info' });
      } else {
        stripe.createToken(card).then(function (r) {
          if (r.error) {
            // Inform the user if there was an error.
            const errorElement = document.getElementById(htmlErrorId);
            errorElement.textContent = r.error.message;
            resolve({ err: PaymentError.INVALID_BANK_CARD, chargeId: '', msg: r.error.message });
          } else {
            resolve({err: PaymentError.NONE, status: r.status, chargeId: r.chargeId, token: r.token, msg: ''});
          }
        }, err => {
          resolve({ err: PaymentError.INVALID_BANK_CARD, chargeId: '', msg: 'empty card info' });
        });
      }
    });
  }
}
