
import React from 'react';
import {DeliveryList} from './DeliveryList';
import {Footer} from '../common/Footer';
import './Delivery.scss';
import {ProductAPI} from '../product/API';
import { store } from '..';

export class Delivery extends React.Component{
  productSvc = new ProductAPI();
  constructor(props) {
    super(props);
    const productId = this.props.match.params.id;

    this.change = this.change.bind(this);
    this.mergeQuantity = this.mergeQuantity.bind(this);

    this.state = { 
      product: {_id: productId, name:'', merchantId:''}, 
      deliveries: this.mergeQuantity(),
      pathname: ''
    };

    // this.onAddressListSelect = this.onAddressListSelect.bind(this);
    // this.getAddressInputVal = this.getAddressInputVal.bind(this);
  }

  render() {
    return <div className="page">
      <div className="title-row">{this.state.product.name}</div>
      <div className="page-body">
        {/* <CategoryList></CategoryList> */}
        <DeliveryList deliveries={this.state.deliveries} product={this.state.product} onChange={this.change}></DeliveryList>
      </div>
      <Footer type="button" pathname={this.state.pathname}></Footer>
    </div>
  }

  change(item){
    const its = [];
    this.state.deliveries.map(it => {
      if(it._id === item._id){
        its.push(item);
      }else{
        its.push(it);
      }
    });

    this.setState({deliveries: its});
  }

  mergeQuantity(){
    const deliveries = 
      [
        { date: '2020-02-02', time:'11:00:00', bPassed: 'true', quantity: 0, price: 1, cost: 0.5 },
        { date: '2020-02-09', time:'11:00:00', bPassed: 'false', quantity: 0, price: 0.6, cost: 0.1 },
        { date: '2020-02-16', time:'11:00:00', bPassed: 'false', quantity: 0, price: 0.7, cost: 0.4 },
      ];
    const ds = [];
    const productId = this.props.match.params.id;
    const s = store.getState();

    const cartItem = s.cart.find(it => it.productId === productId);
    
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

    this.productSvc.getById(productId,['_id', 'name', 'price', 'merchantId']).then(product => {
      this.setState({product, pathname: "/merchant/" + product.merchantId});
    });
  }
}