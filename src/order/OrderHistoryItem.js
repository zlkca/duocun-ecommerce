import React from 'react';
import { OrderType } from './Model';
import './OrderHistoryItem.scss';
import { LocationAPI } from '../location/API';

export class OrderHistoryItem extends React.Component {
  // productSvc = new ProductAPI();
  locationSvc = new LocationAPI();
  // orderSvc = new OrderAPI();
  // paymentSvc = new PaymentAPI();
  // accountSvc = new AccountAPI();

  constructor(props) {
    super(props);
    // const loactionSvc = new LocationAPI();
    // const s = store.getState();
    // const location = s.location;
    // const merchant = s.merchant;
    this.state = {}
    this.select = this.select.bind(this);
    this.toDateString = this.toDateString.bind(this);
    this.getAddress = this.getAddress.bind(this);
  }

  select() {

  }

  toDateString(s) {
    const t = s.split('.')[0];
    return t.replace('T', '');
  }

  getAddress(location) {
    return this.locationSvc.toAddressString(location);
  }

  render() {
    const order = this.props.item;
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
        {/* <div className="row order-detail">
          <div className="col-7 items-col" *ngIf="order.type!=='MM'">
            <div *ngFor="let item of order.items" className="text-sm row item-row">
              <div className="col-7 product-col">{{ item.product.name }}</div>
              <div className="col-2 quantity-col">x {{ item.quantity }}</div>
              <div className="col-3 price-col">${{ item.product.price | number : '1.2-2'}}</div>
            </div>
        </div > */}



        <div className="col-7 items-col">
          <div className="description-col">{order.description}</div>
        </div>
      </div>
    );
  }

}