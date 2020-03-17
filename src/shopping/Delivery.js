
import React from 'react';
import {DeliveryList} from './DeliveryList';
import {Footer} from '../common/Footer';
import './Delivery.scss';
import {ProductAPI} from '../product/API';
import { store } from '..';
import * as moment from 'moment';

export class Delivery extends React.Component{
  productSvc = new ProductAPI();
  constructor(props) {
    super(props);
    const productId = this.props.match.params.id;
    const s = store.getState();
    const amount = this.getTotalPrice(s.cart);
    this.state = { 
      product: {_id: productId, name:'', merchantId:''}, 
      deliveries: [], // this.mergeQuantity(),
      pathname: '',
      amount
    };
    
    
    this.change = this.change.bind(this);
    this.mergeQuantity = this.mergeQuantity.bind(this);
    this.getDeliverySchedule = this.getDeliverySchedule.bind(this);
    this.getTotalPrice = this.getTotalPrice.bind(this);
  }

  render() {
    const product = this.state.product;
    return <div className="page">
      <div className="title-row">{product.name}&nbsp;${product.price}</div>
      <div className="page-body">
        {/* <CategoryList></CategoryList> */}
        <div className="text-md note-row">请选择送货时间和数量</div>
        <DeliveryList deliveries={this.state.deliveries} product={this.state.product} onChange={this.change}></DeliveryList>
      </div>
      <Footer type="button" pathname={this.state.pathname} amount={this.state.amount}></Footer>
    </div>
  }

  change(){
    const s = store.getState();
    const amount = this.getTotalPrice(s.cart);
    this.setState({amount});
  }
  
  getTotalPrice(cart) { // group by date time
    let total = 0;
    cart.map(it => { //  {productId, productName, deliveries:[{date, time, price, quantity }]}
      it.deliveries.map(d => {
        total += d.price * d.quantity;
      });
    });
    return total;
  }

  getDeliverySchedule(baseDateList, baseTimeList, product){
    const baseList = baseDateList.map(baseDate => baseDate + 'T' + baseTimeList[0] + '.000Z');
    const list = [];
    for(let i=0; i<30; i++){
      const dateList = baseList.map(s => moment(s).add(7 * i, 'days').toISOString().split('T')[0]);
      dateList.map(d => {
        baseTimeList.map(t => {
          list.push({date: d, time: t, quantity:0, price: product.price, cost: product.cost});
        });
      });
    }
    return list;
  }

  mergeQuantity(deliveries, cart, productId){
    const ds = [];
    const cartItem = cart.find(it => it.productId === productId);
    
    if(cartItem && cartItem.deliveries && cartItem.deliveries.length>0){ // try merge
      deliveries.map(d => {
        const updated = cartItem.deliveries.find(it => it.date + it.time === d.date + d.time);
        if(updated){
          ds.push({ date: d.date, time:d.time, quantity: updated.quantity, price: d.price, cost: d.cost });
        }else{
          ds.push(d);
        }
      });
      return ds;
    }else{
      return deliveries;
    }
  }

  componentDidMount() {
    const productId = this.props.match.params.id;
    const s = store.getState();
    const baseDateList = ['2020-03-17', '2020-03-19'];
    const baseTimeList = ['11:00:00'];
    this.productSvc.getById(productId,['_id', 'name', 'price', 'merchantId']).then(product => {
      const ds = this.getDeliverySchedule(baseDateList, baseTimeList, product);
      const deliveries = this.mergeQuantity(ds, s.cart, productId);
      this.setState({product, deliveries, pathname: "/merchant/" + product.merchantId});
    });
  }
}