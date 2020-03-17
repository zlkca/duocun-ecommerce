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
    // const list = [
    //   {dow: '本周5', date:'1月2日', bPassed:'true'},
    //   {dow: '下周5', date:'1月9日', bPassed:'false'},
    //   {dow: '', date:'1月16日', bPassed:'false'},
    // ]
    return (
      <div className="row delivery-item">
        {/* this.props.list && this.props.list.length > 0 && */}
        <DateItem className="date-col" item={this.props.delivery}></DateItem>
        <QuantityInput className="quantity-col" val={this.props.delivery.quantity}
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

  // actions --- addToCart
  // item - eg. {productId:x, date:'2020-03-10', time:'14:00', quantity: 2}
  increase(oldQuantity){
    const product = this.props.product;
    const delivery = this.props.delivery;
    this.props.addToCart({
      productId: product._id,
      productName: product.name, 
      date: delivery.date,
      time: delivery.time,
      quantity: oldQuantity,
      price: delivery.price,
      cost: delivery.cost,
    });
    this.props.onChange();
  }

  // actions --- removeFromCart
  // item - eg. {productId:x, date:'2020-03-10', time:'14:00', quantity: 2}
  decrease(oldQuantity){
    const product = this.props.product;
    const delivery = this.props.delivery;
    this.props.removeFromCart({
      productId: product._id,
      productName: product.name, 
      date: delivery.date,
      time: delivery.time,
      quantity: oldQuantity,
      price: delivery.price,
      cost: delivery.cost,
    });
    this.props.onChange();
  }

  // actions --- removeFromCart
  // item - eg. {productId:x, date:'2020-03-10', time:'14:00', quantity: 2}
  change(quantity){
    const product = this.props.product;
    const delivery = this.props.delivery;
    this.props.changeQuantity({
      productId: product._id,
      productName: product.name, 
      date: delivery.date,
      time: delivery.time,
      quantity,
      price: delivery.price,
      cost: delivery.cost,
    });

    this.props.onChange();
  }
}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps, {addToCart, removeFromCart, changeQuantity})(DeliveryItem);