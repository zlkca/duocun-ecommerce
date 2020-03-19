import React from 'react';
import './ChargeItemList.scss';

export class ChargeItemList extends React.Component {

  constructor(props) {
    super(props);
    this.comfirm = this.confirm.bind(this);
  }

  render() {
    return <div className="charge-item-list">
    {
      this.props.items.map(item => 
        <div className="text-sm item-row">
          <div className="product-col">{item.name + ' ' + item.date}</div>
          <div className="quantity-col">x{item.quantity}</div>
          <div className="price-col">${item.price}</div>
        </div>
      )
    }

    </div>
  }


  confirm() {

  }
}