import React from 'react';
import { connect } from 'react-redux';
import './DeliveryItem.scss';
import { DateItem } from './DateItem';
import { QuantityInput } from '../common/QuantityInput';
import { addToCart, removeFromCart, changeQuantity } from '../actions';

class DeliveryItem extends React.Component{
  constructor(props){
    super(props);
    this.state = {quantity: this.props.delivery.quantity};

    this.select = this.select.bind(this);
    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);
    this.change = this.change.bind(this);
  }

  render(){
    const delivery = this.props.delivery;
    const quantity = this.state.quantity;
    return (
      <div className="row delivery-item">
        {/* this.props.list && this.props.list.length > 0 && */}
        <DateItem className="date-col" date={delivery.date} time={delivery.time}></DateItem>
        <QuantityInput className="quantity-col" quantity={quantity}
          onIncrease={this.increase}
          onDecrease={this.decrease}
          onChange={this.change}>
        </QuantityInput>
      </div>
    );
  }

  // item --- IAddress
  select(item){ 
    this.props.select(item);
    // this.setState({selected: v});
  }

  // item - eg. {productId:x, date:'2020-03-10', time:'14:00', quantity: 2}
  increase(quantity){
    const product = this.props.product;
    const delivery = { ...this.props.delivery, ...{quantity} };
    this.props.changeQuantity({
      product,
      delivery
    });
    this.setState({quantity});
    this.props.onChange();
  }

  // item - eg. {productId:x, date:'2020-03-10', time:'14:00', quantity: 2}
  decrease(quantity){
    const product = this.props.product;
    const delivery = { ...this.props.delivery, ...{quantity} };
    this.props.changeQuantity({
      product,
      delivery
    });
    this.setState({quantity});
    this.props.onChange();
  }

  // item - eg. {productId:x, date:'2020-03-10', time:'14:00', quantity: 2}
  change(quantity){
    const product = this.props.product;
    const delivery = { ...this.props.delivery, ...{quantity} };
    this.props.changeQuantity({
      product,
      delivery
    });
    this.setState({quantity});
    this.props.onChange();
  }
}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps, {addToCart, removeFromCart, changeQuantity})(DeliveryItem);