import React from 'react';
import './ChargeItemList.scss';
import { Footer } from '../common/Footer';
// import {ProductAPI} from '../product/API';
// import {MerchantAPI} from '../merchant/API';

export class ChargeItemList extends React.Component {
  // productSvc = new ProductAPI();
  // merchantSvc = new MerchantAPI();

  constructor(props) {
    super(props);
    this.comfirm = this.confirm.bind(this);
    // this.onAddressInputClear = this.onAddressInputClear.bind(this);
    // this.onAddressListSelect = this.onAddressListSelect.bind(this);
    // this.getAddressInputVal = this.getAddressInputVal.bind(this);
    // const s = store.getState();

    // balance >= charge.total ? 0 : charge.total - balance
  }

  render() {
    return <div className="charge-item-list">
    {
      this.props.items.map(item => 
        <div className="text-sm item-row">
          <div className="product-col">{item.productName}</div>
          <div className="quantity-col">x{item.quantity}</div>
          <div className="price-col">${item.price}</div>
        </div>
      )
    }

    </div>
  }

  // componentDidMount() {
  //   const merchantId = this.props.match.params.id;
  //   this.merchantSvc.getById(merchantId).then(merchant => {
  //     this.productSvc.quickFind({merchantId},['_id', 'name', 'price']).then(products => {
  //       this.setState({products, merchant});
  //     });
  //   });
  // }

  confirm() {

  }
}