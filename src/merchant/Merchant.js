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
    this.state = { products: [], merchant: { _id: merchantId, name: ''} };
    // this.onAddressInputChange = this.onAddressInputChange.bind(this);
    // this.onAddressInputClear = this.onAddressInputClear.bind(this);
    // this.onAddressListSelect = this.onAddressListSelect.bind(this);
    // this.getAddressInputVal = this.getAddressInputVal.bind(this);
    const s = store.getState();
  }
  render() {
    return <div className="page">
      <div className="title-row">{this.state.merchant ? this.state.merchant.name : ''}</div>
      <div className="page-body">
      {/* <CategoryList></CategoryList> */}
      <ShoppingList products={this.state.products} merchant={this.state.merchant}></ShoppingList>
      </div>
      <Footer type="button" pathname="/order"></Footer>
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
}



const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps, {updateMerchant})(Merchant);
