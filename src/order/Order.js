import React from 'react';
import Modal from 'react-bootstrap/Modal';

import './Order.scss';
import { Footer } from '../common/Footer';
// import {ProductAPI} from '../product/API';
// import {MerchantAPI} from '../merchant/API';
import { Charge } from './Charge';
import { store } from '..';

import { PaymentMethodSelect } from '../common/PaymentMethodSelect';
import { ChargeItemList } from './ChargeItemList';
import { LocationAPI } from '../location/API';
import { PaymentAPI } from '../payment/API';

import { CardElement, useStripe, useElements, StripeProvider } from '@stripe/react-stripe-js';
import { InjectedCheckoutForm } from '../payment/CreditCardForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { OrderAPI } from './API';
import { ProductAPI } from '../product/API';
import { AccountAPI } from '../account/API';
import { PaymentMethod, OrderType, OrderStatus, PaymentStatus, PaymentError } from './Model';
import { Phone } from '../account/Phone';

const stripePromise = loadStripe('pk_test_IQkfGbooEHrkJ90xj3fMjxwM');

export class Order extends React.Component {
  productSvc = new ProductAPI();
  orderSvc = new OrderAPI();
  paymentSvc = new PaymentAPI();
  accountSvc = new AccountAPI();

  constructor(props) {
    super(props);
    const loactionSvc = new LocationAPI();
    const s = store.getState();
    const location = s.location;
    const merchant = s.merchant;
    this.state = {
      account: '',
      lang: 'zh',
      products: [],
      merchant,
      location,
      paymentMethod: PaymentMethod.CREDIT_CARD,
      phone: '',
      note: '',
      address: location ? loactionSvc.getAddressString(location) : '',
      items: [{ productName: '土豆', quantity: 3, price: 0.5 }],
      stripe: null,
      card: null,
      order: null,
      cart: s.cart,
      bModal: false
    };
    this.submitOrder = this.submitOrder.bind(this);
    this.onCreditCardChange = this.onCreditCardChange.bind(this);
    this.createOrder = this.createOrder.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.onClosePhoneVerifyDialog = this.onClosePhoneVerifyDialog.bind(this);
    this.onSelectPaymentMethod = this.onSelectPaymentMethod.bind(this);
  }

  handleClose() {
    this.setState({ bModal: false });
  }
  handleShow() {
    this.setState({ bModal: true });
  };

  onSelectPaymentMethod(paymentMethod) {
    this.setState({ paymentMethod });
  }

  render() {
    const charge = {
      price: 10, deliveryCost: 0, deliveryDiscount: 0,
      tax: 0.13 * 10, tips: 0, total: Math.round(10 * 1.13 / 100) * 100, overRangeCharge: 0, balance: 1,
      payable: 9
    };
    return (
      <div className="page">
        <div className="title-row">订单确认</div>
        <div className="page-body">

          <div className="contact">
            <div className="row phone">
              <div className="label">联系电话</div>
              <div className="text">{this.state.phone}</div>
            </div>
            <div className="row address">
              <div className="label">送货地址</div>
              <div className="text">{this.state.address}</div>
            </div>
          </div>
          <div className="row title-md merchant">Truly Fresh</div>
          <div className="left-side">
            <ChargeItemList items={this.state.items}></ChargeItemList>
          </div>
          <div className="right-side">
            <Charge charge={charge}></Charge>
          </div>

          <div className="label payment-label">付款方式</div>
          
          <PaymentMethodSelect onSelect={this.onSelectPaymentMethod}></PaymentMethodSelect>

          {
            this.state.paymentMethod === PaymentMethod.CREDIT_CARD &&
            <Elements stripe={stripePromise}>
              <InjectedCheckoutForm onChange={this.onCreditCardChange} />
            </Elements>
          }

          <div className="row warning-block">
            <div className="label-sm text-warning">*如果你在公寓楼或办公楼请在大楼门口取件，我们无法上楼送件。</div>
            <div className="label-sm text-warning">**请将您的电话保持在接听状态，以便联系。</div>
          </div>

          <div className="notes-block">
            <div className="row label-sm">
              <span>备注</span>:
            </div>
            <div className="row">
              <textarea name="note" value={this.state.note}></textarea>
            </div>
          </div>
        </div>




        <Footer type="button" onNext={this.submitOrder}></Footer>

        <Modal show={this.state.bModal} onHide={this.handleClose}>
          {/* <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header> */}
          <Modal.Body>
            <Phone onClose={this.onClosePhoneVerifyDialog} />
          </Modal.Body>
          <Modal.Footer>
            <div onClick={this.handleClose}>
              Closed
          </div>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }

  onCreditCardChange(e) {
    this.setState({ stripe: e.stripe, card: e.card });
  }



  // delivery --- only need 'origin' and 'dateType' fields
  createOrder(account, merchant, items, location, deliverDate, deliverTime, charge, note, paymentMethod) {
    const order = {
      clientId: account._id,
      clientName: account.username,
      merchantId: merchant._id,
      merchantName: this.state.lang === 'zh' ? merchant.name : merchant.nameEN,
      items,
      location,
      deliverDate,
      deliverTime,
      type: OrderType.GROCERY,
      status: (paymentMethod === PaymentMethod.WECHAT || paymentMethod === PaymentMethod.CREDIT_CARD) ? OrderStatus.TEMP : OrderStatus.NEW,
      paymentStatus: PaymentStatus.UNPAID,
      paymentMethod,
      note,
      price: Math.round(charge.price * 100) / 100,
      cost: Math.round(charge.cost * 100) / 100,
      deliveryCost: Math.round(merchant.deliveryCost * 100) / 100,
      deliveryDiscount: Math.round(merchant.deliveryCost * 100) / 100,
      groupDiscount: Math.round(charge.groupDiscount * 100) / 100,
      overRangeCharge: Math.round(charge.overRangeCharge * 100) / 100,
      total: Math.round(charge.total * 100) / 100,
      tax: Math.round(charge.tax * 100) / 100,
      tips: Math.round(charge.tips * 100) / 100,
      defaultPickupTime: account.pickup
    };

    return order;
  }

  componentDidMount() {
    if (this.state.merchant) {
      const merchantId = this.state.merchant._id;
      this.productSvc.quickFind({ merchantId }, ['_id', 'name', 'price']).then(products => {
        this.accountSvc.getCurrentAccount().then(account => {
          this.setState({ products, account });
        });
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
    const account = this.state.account;

    if (!account || !account.verified) {
      this.setState({ bModal: !account.verified });
      return;
    }

    const merchant = this.state.merchant;
    const location = this.state.location;
    const paymentMethod = this.state.paymentMethod;
    const note = this.state.note;
    const groups = this.getOrderGroups(this.state.cart);
    const orders = [];
    groups.map(group => {
      const charge = this.getCharge(group);
      const order = this.createOrder(account, merchant, group.items, location, group.date, group.time, charge, note, paymentMethod);
      orders.push(order);
    });

    const summary = this.getSummary(groups);
    const amount = summary.price;

    this.orderSvc.placeOrders(orders).then(newOrders => {
      if (this.state.paymentMethod === PaymentMethod.CREDIT_CARD) {
        this.state.stripe.createPaymentMethod({
          type: 'card',
          card: this.state.card,
          billing_details: {
            name: account.username
          }
        }).then(result => {
          if (result.error) {
            // An error happened when collecting card details,
            // show `result.error.message` in the payment form.
          } else {
            this.paymentSvc.payByCreditCard(account._id, account.username, newOrders, amount, note).then(rsp => {
              if (rsp && rsp.err === PaymentError.NONE) {
                window.location.href = 'http://localhost:3001/history';
              } else {
                // show error;
              }
            });
          }
        });
      } else if (this.state.paymentMethod === PaymentMethod.WECHAT) {
        this.paymentSvc.payBySnappay(account._id, account.username, newOrders, amount, note).then(rsp => {
          if (rsp && rsp.err === PaymentError.NONE) {
            if (rsp.url) {
              window.location.href = rsp.url;
            }
          } else {
            // show error
          }
        });
      } else { // PaymentMethod.CASH
        // this.orderSvc.addDebit(newOrders).then(rsp => {
        window.location.href = 'http://localhost:3001/history';
        // });
      }
    });
  }

  onClosePhoneVerifyDialog() {
    this.setState({ bModal: false });
    this.submitOrder();
  }
}