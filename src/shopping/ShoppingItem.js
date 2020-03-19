import React from 'react';
import { connect } from 'react-redux';

import { QuantityInput } from '../common/QuantityInput';
import './ShoppingItem.scss';
import { addToCart, removeFromCart } from '../actions';

class ShoppingItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = { quantity: 0 };
    this.select = this.select.bind(this);
    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);
    this.change = this.change.bind(this);
  }

  select() {

  }

  increase() {
    // const it = this.props.item;
    // this.props.addToCart({productId: it._id, deliveryDate});
  }

  decrease() {
    // this.props.removeFromCart(v);
  }

  change() {

  }

  render() {
    const item = this.props.item;
    const url = 'http://localhost:8000/' + item.pictures[0].url;
    return (
      <div className="item">
        <div className="product-col" onClick={this.select}>
          <div className="image-col">
            <img src={url} />
          </div>
          <div className="text-col">
            <div className="title-bg name">{item.name}
            </div>
            <div className="title-bg price">${item.price}
            </div>
            <div className="text-sm description">
              {item.description}
            </div>
            <div className="view-detail">详情</div>
          </div>
        </div>

        {
          // this.state.quantity > 0 &&
          // <QuantityInput onIncrease={this.increase}
          //   onDecrease={this.decrease}
          //   onChange={this.change}
          //   quantity={this.state.quantity}>
          // </QuantityInput>
        }

      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps, { addToCart, removeFromCart })(ShoppingItem);