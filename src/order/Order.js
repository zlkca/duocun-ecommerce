import React from 'react';
import Modal from 'react-bootstrap/Modal';

import './Order.scss';
import { Footer } from '../common/Footer';
import {PaymentMethod, PaymentStatus, PaymentError} from '../payment/API';
// import {MerchantAPI} from '../merchant/API';
import { Charge } from './Charge';
import { store } from '..';

import { PaymentMethodSelect } from '../common/PaymentMethodSelect';
import { ChargeItemList } from './ChargeItemList';
import { LocationAPI } from '../location/API';
import { PaymentAPI } from '../payment/API';
import { InjectedCheckoutForm } from '../payment/CreditCardForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { OrderAPI } from './API';
import { ProductAPI } from '../product/API';
import { AccountAPI } from '../account/API';
import { OrderType, OrderStatus } from './Model';
import { Phone } from '../account/Phone';

const stripePromise = loadStripe('pk_test_IQkfGbooEHrkJ90xj3fMjxwM');

export class Order extends React.Component {
  productSvc = new ProductAPI();
  orderSvc = new OrderAPI();
  paymentSvc = new PaymentAPI();
  accountSvc = new AccountAPI();
  groups;
  summary;
  constructor(props) {
    super(props);
    const loactionSvc = new LocationAPI();
    const s = store.getState();
    const location = s.location;
    const merchant = s.merchant;
    const chargeItems = this.getChargeItems(s.cart); // [{date, time, quantity, _id, name, price, cost, taxRate}] }]
    this.groups = this.getOrderGroups(s.cart);
    this.summary = this.getSummary(this.groups, 0);
    this.state = {
      account: '',
      lang: 'zh',
      products: [],
      merchant,
      location,
      paymentMethod: PaymentMethod.CREDIT_CARD,
      phone: '',
      note: '',
      address: location ? loactionSvc.toAddressString(location) : '',
      chargeItems,
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
    this.getChargeItems = this.getChargeItems.bind(this);
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
    const bShowBalance = true;
    const balance = Math.round(this.state.account.balance * 100) / 100;
    const payable = Math.round((balance >= this.summary.total ? 0 : this.summary.total - balance) * 100) / 100;
    const charge = { ...this.summary, ...{ payable }, ...{ balance } };
    const merchant = this.state.merchant;
    return (
      <div className="page">
        <div className="title-row">订单确认</div>
        <div className="page-body">
          <div className="row scroll-frame">
            <div className="contact">
              <div className="row phone">
                <div className="label">联系电话</div>
                <div className="text">{this.state.phone}</div>
              </div>
              <div className="row address">
                <div className="label">送货地址</div>
                <div className="text">{this.state.address}</div>
              </div>
              <div className="row merchant">
                <div className="label">商家</div>
                <div className="text">{merchant.name}</div>
              </div>
            </div>
            {/* <div className="row title-md merchant">Truly Fresh</div> */}

            <div className="left-side">
              <ChargeItemList items={this.state.chargeItems}></ChargeItemList>
            </div>
            <div className="right-side">
              <Charge charge={charge} bShowBalance={bShowBalance}></Charge>
            </div>
            {
              this.state.paymentMethod != PaymentMethod.PREPAY ?
                <div>
                  <div className="label payment-label">付款方式</div>
                  <PaymentMethodSelect onSelect={this.onSelectPaymentMethod}></PaymentMethodSelect>
                  {
                    this.state.paymentMethod === PaymentMethod.CREDIT_CARD &&
                    <Elements stripe={stripePromise}>
                      <InjectedCheckoutForm onChange={this.onCreditCardChange} />
                    </Elements>
                  }
                </div>
                :
                <div className="prepay">用余额付款</div>
            }

            <div className="row warning-block">
              <div className="label-sm text-warning">*如果你在公寓楼或办公楼请在大楼门口取件，我们无法上楼。</div>
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

    // const sCreated = moment().toISOString();
    // const { deliverDate, deliverTime } = this.getDeliveryDateTimeByPhase(sCreated, merchant.phases, delivery.dateType);
    const status = (paymentMethod === PaymentMethod.CREDIT_CARD || paymentMethod === PaymentMethod.WECHAT) ?
      OrderStatus.TEMP : OrderStatus.NEW; // prepay need Driver to confirm finished
    const paymentStatus = paymentMethod === PaymentMethod.PREPAY ? PaymentStatus.PAID : PaymentStatus.UNPAID;

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
      status,
      paymentStatus,
      paymentMethod,
      note,
      price: Math.round(charge.price * 100) / 100,
      cost: Math.round(charge.cost * 100) / 100,
      deliveryCost: Math.round(charge.deliveryCost * 100) / 100,
      deliveryDiscount: Math.round(charge.deliveryCost * 100) / 100,
      groupDiscount: Math.round(charge.groupDiscount * 100) / 100,
      overRangeCharge: Math.round(charge.overRangeCharge * 100) / 100,
      total: Math.round(charge.total * 100) / 100,
      tax: Math.round(charge.tax * 100) / 100,
      tips: Math.round(charge.tips * 100) / 100,
      defaultPickupTime: account.pickup ? account.pickup : ''
    };

    return order;
  }

  componentDidMount() {
    if (this.state.merchant) {
      const merchantId = this.state.merchant._id;
      this.productSvc.quickFind({ merchantId }, ['_id', 'name', 'price', 'taxRate']).then(products => {
        this.accountSvc.getCurrentAccount().then(account => {
          const amount = this.summary.total;
          const paymentMethod = (account.balance >= amount) ? PaymentMethod.PREPAY : this.state.paymentMethod;

          this.setState({ products, account, paymentMethod });
        });
      });
    }
  }

  // cart --- [{product, deliveries: [{date, time, quantity}] }]
  // return --- {date, time, _id, name, quantity, price, cost}
  getChargeItems(cart) { // group by date time
    const chargeItems = [];
    cart.map(it => { //  {product, deliveries:[{date, time, quantity}]}
      it.deliveries.map(d => {
        chargeItems.push({ ...d, ...it.product });
      });
    });
    return chargeItems;
  }

  // cart --- [{product, deliveries: [{date, time, quantity}] }]
  // return --- [{date, time, items: [{productId, quantity, price, cost}] }]
  getOrderGroups(cart) { // group by date time
    const orders = [];
    cart.map(it => { //  {product, deliveries:[{date, time, quantity }]}
      it.deliveries.map(d => {
        const order = orders.find(t => t.date === d.date && t.time === d.time);
        if (order) {
          order.items.push({ productId: it.product._id, quantity: d.quantity, price: it.product.price, cost: it.product.cost, taxRate: it.product.taxRate });
        } else {
          orders.push({ 
            date: d.date, 
            time: d.time,
            items: [{ productId: it.product._id, quantity: d.quantity, price: it.product.price, cost: it.product.cost, taxRate: it.product.taxRate }]
          });
        }
      });
    });
    return orders;
  }

  // groups --- [{date, time, items: [{productId, quantity, price, cost, taxRate}] }]
  getSummary(groups, overRangeCharge) {
    let totalPrice = 0;
    let totalCost = 0;
    let totalTax = 0;
    let totalTips = 0;
    let totalOverRangeCharge = 0;
    let total = 0;

    const tips = 0;
    const groupDiscount = 0;

    if (groups && groups.length > 0) {
      groups.map(order => {
        let price = 0;
        let cost = 0;
        let tax = 0;
        order.items.map(x => {
          price += x.price * x.quantity;
          cost += x.cost * x.quantity;
          tax += Math.ceil(x.price * x.quantity * x.taxRate) / 100;
        });
        let subTotal = (price + tax + tips - groupDiscount + overRangeCharge);
        totalPrice += price;
        totalCost += cost;
        totalTax += tax;
        totalOverRangeCharge += overRangeCharge;
        total += subTotal;
      });
    }

    return {
      price: Math.round(totalPrice * 100) / 100,
      cost: Math.round(totalCost * 100) / 100,
      tips: Math.round(totalTips * 100) / 100,
      tax: Math.round(totalTax * 100) / 100,
      overRangeCharge: Math.round(totalOverRangeCharge * 100) / 100,
      deliveryCost: 0, // merchant.deliveryCost,
      deliveryDiscount: 0, // merchant.deliveryCost,
      groupDiscount, // groupDiscount,
      total: Math.round(total * 100) / 100
    };
  }

  getCharge(group, overRangeCharge) {
    let price = 0;
    let cost = 0;
    let tax = 0;

    group.items.map(x => {
      price += x.price * x.quantity;
      cost += x.cost * x.quantity;
      tax += Math.ceil(x.price * x.quantity * x.taxRate) / 100;
    });

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
    const amount = this.summary.total;
    const orders = [];
    const overRangeCharge = 0;
    this.groups.map(group => {
      const charge = this.getCharge(group, overRangeCharge);
      const order = this.createOrder(account, merchant, group.items, location, group.date, group.time, charge, note, paymentMethod);
      orders.push(order);
    });


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
                this.props.history.push('/history/' + this.state.account._id);
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
      } else { // PaymentMethod.CASH || PaymentMethod.PREPAY
        // this.orderSvc.addDebit(newOrders).then(rsp => {
        // window.location.href = 'http://localhost:3000/history';
        // });
        this.props.history.push('/history/' + this.state.account._id);
      }
    });
  }

  onClosePhoneVerifyDialog() {
    this.setState({ bModal: false });
    this.submitOrder();
  }
}