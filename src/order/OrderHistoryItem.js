import React from 'react';
import { OrderType } from './Model';
import './OrderHistoryItem.scss';
import { LocationAPI } from '../location/API';
import { Charge } from './Charge';

export class OrderHistoryItem extends React.Component {

  locationSvc = new LocationAPI();

  constructor(props) {
    super(props);
    this.state = {}
    this.select = this.select.bind(this);
    this.toDateString = this.toDateString.bind(this);
    this.getAddress = this.getAddress.bind(this);
    this.getCharge = this.getCharge.bind(this);
  }

  select() {

  }

  toDateString(s) {
    const t = s.split('.')[0];
    return t.replace('T', ' ');
  }

  getAddress(location) {
    return this.locationSvc.toAddressString(location);
  }

  getCharge(order) {
    let price = 0;
    let cost = 0;
    let tax = 0;

    order.items.map(x => {
      price += x.price * x.quantity;
      cost += x.cost * x.quantity;
      tax += Math.round(x.price * x.quantity * x.product.taxRate) / 100;
    });
    
    tax += Math.round((order.overRangeCharge + order.deliveryCost) * 13) / 100; // fix me !

    const tips = 0;
    const groupDiscount = 0;
    const total = price + order.deliveryCost + tax + tips + order.overRangeCharge - order.deliveryDiscount - groupDiscount ;
    return {
      price: Math.round(price * 100) / 100,
      cost: Math.round(cost * 100) / 100,
      deliveryCost: Math.round(order.deliveryCost * 100) / 100,
      deliveryDiscount: Math.round(order.deliveryDiscount * 100) / 100,
      groupDiscount: Math.round(groupDiscount * 100) / 100,
      overRangeCharge: Math.round(order.overRangeCharge * 100) / 100,
      total: Math.round(total * 100) / 100,
      tax: Math.round(tax * 100) / 100,
      tips: Math.round(tips * 100) / 100
    };
  }
  
  render() {
    const order = this.props.item;
    const charge = this.getCharge(order);
    return (
      <div className="order-history" onClick={this.select}>
        <div className="row first-row">
          <div className="col-12 text-col">
            <div className="col-12">
              <span className="title-xs">商家</span>:
              <span className="text-xs">{order.merchantName}</span>
            </div>

            {
              (order.type === OrderType.FOOD_DELIVERY || order.type === OrderType.GROCERY) &&
              <div className="col-12">
                <span className="title-xs">配送日期</span>:
                <span className="text-xs">{this.toDateString(order.delivered)}</span>
              </div>
            }

            <div className="col-12">
              <span className="title-xs">下单时间</span>:
              <span className="text-xs">{this.toDateString(order.created)}</span>
            </div>

            {
              (order.type === OrderType.FOOD_DELIVERY || order.type === OrderType.GROCERY) &&
              <div className="col-12">
                <span className="title-xs">配送地址</span>:
                <span className="text-xs">{this.getAddress(order.location)}</span>
              </div>
            }
          </div>
        </div>

        <div className="row order-detail">
          {
            order.type !== OrderType.MOBILE_PLAN_MONTHLY &&
            <div className="col-7 items-col">
              {
                order.items.map(item =>
                  <div className="text-sm row item-row">
                    <div className="col-7 product-col">{item.product.name}</div>
                    <div className="col-2 quantity-col">x {item.quantity}</div>
                    <div className="col-3 price-col">${item.product.price}</div>
                  </div>
                )
              }
            </div>
            }
            <div className="col-5 total-col">
              <Charge charge={charge}></Charge>
            </div>

          {/* <div className="col-7 items-col">
            <div className="description-col">{order.description}</div>
          </div> */}
        </div>
      </div>
    );
  }
    
}