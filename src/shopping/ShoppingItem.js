import React from 'react';
import {QuantityInput} from '../common/QuantityInput';
import './ShoppingItem.scss';
import { connect } from 'react-redux';
import { addToCart, removeFromCart } from '../actions';

class ShoppingItem extends React.Component{

  constructor(props){
    super(props);
    this.state = {quantity:0};
    this.select = this.select.bind(this);
    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);
    this.change = this.change.bind(this);
  }

  select(){

  }

  increase(v){
    this.props.addToCart(v);
  }

  decrease(v){
    this.props.removeFromCart(v);
  }

  change(){

  }

  render(){
    return <div className="shopping-item">
            <div className="product-col" key={this.props.item.id} onClick={this.select}>{this.props.item.name}</div> 
            <QuantityInput onIncrease={this.increase}
              onDecrease={this.decrease}
              onChange={this.change}
              val={this.state.quantity}>
            </QuantityInput>
          </div>
  }
}


const mapStateToProps = (state) => {
  return { items: state.items };
}

export default connect(mapStateToProps, {addToCart, removeFromCart})(ShoppingItem);