import React from 'react';
import './OrderHistory.scss';
// import { Footer } from '../common/Footer';
// import {ProductAPI} from '../product/API';
// import {MerchantAPI} from '../merchant/API';
// import { Charge } from './Charge';
// import { store } from '..';

// import { PaymentMethodSelect } from '../common/PaymentMethodSelect';
// import { ChargeItemList } from './ChargeItemList';
// import { LocationAPI } from '../location/API';
// import { PaymentAPI } from '../payment/API';
// import { InjectedCheckoutForm } from '../payment/CreditCardForm';
// import { loadStripe } from '@stripe/stripe-js';
import { Footer } from '../common/Footer';
import { OrderHistoryItem } from './OrderHistoryItem';
import { OrderAPI } from './API';
import { AccountAPI } from '../account/API';

const Menu = {
  HOME: 'H',
  ORDER_HISTORY: 'OH',
  ACCOUNT: 'A'
}

export class OrderHistory extends React.Component {
  orderSvc = new OrderAPI();
  // paymentSvc = new PaymentAPI();
  accountSvc = new AccountAPI();
  accountId;

  constructor(props) {
    super(props);

    this.accountId = props.match.params.accountId;  

    this.state = {
      account: '',
      lang: 'zh',
      orders: [],
      // merchant,
      // location,
      // paymentMethod: PaymentMethod.WECHAT,
      // phone: '123456',
      // address: loactionSvc.toAddressString(location),
      // items: [{ productName: '土豆', quantity: 3, price: 0.5 }],
      // stripe: null,
      // card: null,
      // order: null,
      // cart: s.cart
    };
    // this.submitOrder = this.submitOrder.bind(this);
    // this.onCreditCardChange = this.onCreditCardChange.bind(this);
    // this.createOrder = this.createOrder.bind(this);
    // this.getAddressInputVal = this.getAddressInputVal.bind(this);

  }

  render() {
    const charge = {
      price: 10, deliveryCost: 0, deliveryDiscount: 0,
      tax: 0.13 * 10, tips: 0, total: Math.round(10 * 1.13 / 100) * 100, overRangeCharge: 0, balance: 1,
      payable: 9
    };
    return (
      <div className="page">
        <div className="title-row">订单历史</div>
        <div className="page-body">


          {/* <div className="loading-spinner" *ngIf="loading">
  <app-progress-spinner></app-progress-spinner>
</div> */}

          {
            this.state.orders && this.state.orders.length === 0 &&
            <div className="empty-order">
              <div className="order-image">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path fill="none" d="M0 0h24v24H0V0z" />
                  <path d="M7 15h7v2H7zm0-4h10v2H7zm0-4h10v2H7zm12-4h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-.14 0-.27.01-.4.04-.39.08-.74.28-1.01.55-.18.18-.33.4-.43.64-.1.23-.16.49-.16.77v14c0 .27.06.54.16.78s.25.45.43.64c.27.27.62.47 1.01.55.13.02.26.03.4.03h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7-.25c.41 0 .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75zM19 19H5V5h14v14z" />
                </svg>
              </div>
              <span>你还没有任何订单，去逛逛吧。</span>
            </div>
          }

          {
            this.state.orders && this.state.orders.length > 0 &&
            <div className="order-list">
            {
              this.state.orders.map(order => 
                <OrderHistoryItem item={order}></OrderHistoryItem>
              )
            }
            </div>
          }
      </div>
      <Footer select={this.select} type="menu" menu={Menu.ORDER_HISTORY}></Footer>
    </div >
    )
  }

  onCreditCardChange(e) {
    this.setState({ stripe: e.stripe, card: e.card });
  }

  componentDidMount() {
    if (this.accountId) {
      const accountId = this.accountId;
      this.orderSvc.quickFind({ clientId: accountId }).then(orders => {
        this.setState({ orders });
      });
    }
  }

  // cart --- [{productId, deliveries: [{date, time, price, cost, quantity}] }]
  // return --- [{date, time, items: [{productId, quantity, price, cost}] }]
  getOrderGroups(groups) { // group by date time
    const orders = [];
    groups.map(it => { //  {productId, deliveries:[{date, time, price, quantity }]}
      it.deliveries.map(d => {
        const order = orders.find(t => t.date === d.date && t.time === d.time);
        if (order) {
          order.items.push({ productId: it.productId, quantity: d.quantity, price: d.price, cost: d.cost });
        } else {
          orders.push({ date: d.date, time: d.time, items: [{ productId: it.productId, quantity: d.quantity, price: d.price, cost: d.cost }] })
        }
      });
    });
    return orders;
  }

  getSummary(groups, overRangeCharge) {
    let price = 0;
    let cost = 0;

    if (groups && groups.length > 0) {
      groups.map(group => {
        group.items.map(x => {
          price += x.price * x.quantity;
          cost += x.cost * x.quantity;
        });
      });
    }

    const subTotal = price + 0; // merchant.deliveryCost;
    const tax = Math.ceil(subTotal * 13) / 100;
    const tips = 0;
    const groupDiscount = 0;
    const overRangeTotal = Math.round(overRangeCharge * 100) / 100;

    return {
      price, cost, tips, tax,
      overRangeCharge: overRangeTotal,
      deliveryCost: 0, // merchant.deliveryCost,
      deliveryDiscount: 0, // merchant.deliveryCost,
      groupDiscount, // groupDiscount,
      total: price + tax + tips - groupDiscount + overRangeTotal
    };
  }

  getCharge(group, overRangeCharge) {
    let price = 0;
    let cost = 0;

    group.items.map(x => {
      price += x.price * x.quantity;
      cost += x.cost * x.quantity;
    });

    const subTotal = price + 0; // merchant.deliveryCost;
    const tax = Math.ceil(subTotal * 13) / 100;
    const tips = 0;
    const groupDiscount = 0;
    const overRangeTotal = Math.round(overRangeCharge * 100) / 100;

    return {
      price, cost, tips, tax,
      overRangeCharge: overRangeTotal,
      deliveryCost: 0, // merchant.deliveryCost,
      deliveryDiscount: 0, // merchant.deliveryCost,
      groupDiscount, // groupDiscount,
      total: price + tax + tips - groupDiscount + overRangeTotal
    };
  }

  submitOrder() {
    // const account = this.state.account;
    // const merchant = this.state.merchant;
    // const location = this.state.location;
    // const paymentMethod = this.state.paymentMethod;
    // const note = '';
    // const groups = this.getOrderGroups(this.state.cart);
    // const orders = [];
    // groups.map(group => {
    //   const charge = this.getCharge(group);
    //   const order = this.createOrder(account, merchant, group.items, location, group.date, group.time, charge, note, paymentMethod);
    //   orders.push(order);
    // });

    // const summary = this.getSummary(groups);
    // const amount = summary.price;

    // this.orderSvc.placeOrders(orders).then(newOrders => {

    //   if (this.state.paymentMethod === PaymentMethod.CREDIT_CARD) {

    //     this.state.stripe.createPaymentMethod({
    //       type: 'card',
    //       card: this.state.card,
    //       billing_details: {
    //         name: account.username
    //       }
    //     }).then(result => {
    //       if (result.error) {
    //         // An error happened when collecting card details,
    //         // show `result.error.message` in the payment form.
    //       } else {
    //         this.paymentSvc.payByCreditCard(account._id, account.username, newOrders, amount, note).then(rs => {
    //           const s = rs;
    //         });
    //         // Otherwise send paymentMethod.id to your server (see Step 3)
    //         // const response = await fetch('/pay', {
    //         //   method: 'POST',
    //         //   headers: { 'Content-Type': 'application/json' },
    //         //   body: JSON.stringify({
    //         //     payment_method_id: result.paymentMethod.id,
    //         //   }),
    //         // });

    //         // const serverResponse = await response.json();
    //         // this.payByCreditCard(accountId, accountName, order, amount, note).then(rsp => {

    //         // })
    //         // handleServerResponse(serverResponse);
    //       }
    //     });
    //   } else if (this.state.paymentMethod === PaymentMethod.WECHAT) {
    //     this.paymentSvc.payBySnappay(account._id, account.username, newOrders, amount, note).then(rs => {
    //       const s = rs;
    //     });
    //   } else { // PaymentMethod.CASH

    //   }
    // });


  }
}