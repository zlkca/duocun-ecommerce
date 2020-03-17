import React from 'react';

import { connect } from 'react-redux';

// import {CategoryList} from '../shopping/CategoryList';
import {ShoppingList} from '../shopping/ShoppingList';
import './Merchant.scss';
import {Footer} from '../common/Footer';
import {ProductAPI} from '../product/API';
import {MerchantAPI} from './API';

import {store} from '..';
import { updateMerchant } from '../actions';

class Merchant extends React.Component{
  productSvc = new ProductAPI();
  merchantSvc = new MerchantAPI();

  constructor(props) {
    super(props);
    const merchantId = this.props.match.params.id;
    const s = store.getState();
    const amount = this.getTotalPrice(s.cart);
    this.state = { products: [], merchant: { _id: merchantId, name: ''}, amount };
    // this.onAddressInputChange = this.onAddressInputChange.bind(this);
    // this.onAddressInputClear = this.onAddressInputClear.bind(this);
    // this.onAddressListSelect = this.onAddressListSelect.bind(this);
    // this.getAddressInputVal = this.getAddressInputVal.bind(this);
    
  }
  render() {
    return <div className="page">
      <div className="title-row">{this.state.merchant ? this.state.merchant.name : ''}</div>
      <div className="page-body">
      {/* <CategoryList></CategoryList> */}
      <ShoppingList products={this.state.products} merchant={this.state.merchant}></ShoppingList>
      </div>
      <Footer type="button" pathname="/order" amount={this.state.amount}></Footer>
    </div>
  }


  componentDidMount() {
    this.merchantSvc.getById(this.state.merchant._id).then(merchant => {
      this.props.updateMerchant(merchant);
      this.productSvc.quickFind({merchantId: merchant._id},['_id', 'name', 'description', 'price', 'pictures']).then(products => {
        this.setState({products, merchant});
      });
    });
  }

  // change(){
  //   const s = store.getState();
  //   const amount = this.getTotalPrice(s.cart);
  //   this.setState({amount});
  // }
  
  getTotalPrice(cart) { // group by date time
    let total = 0;
    cart.map(it => { //  {productId, productName, deliveries:[{date, time, price, quantity }]}
      it.deliveries.map(d => {
        total += d.price * d.quantity;
      });
    });
    return total;
  }
}




const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps, {updateMerchant})(Merchant);
