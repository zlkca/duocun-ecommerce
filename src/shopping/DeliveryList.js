import React from 'react';
import './DeliveryList.scss';
import DeliveryItem from './DeliveryItem';

export class DeliveryList extends React.Component {
  constructor(props) {
    super(props);
    this.select = this.select.bind(this);
    this.change = this.change.bind(this);
    // this.state = {selected: this.props.selected};
  }

  render() {
    return (
      <div className="delivery-list">
        {
          // this.props.list && this.props.list.length > 0 &&
          this.props.deliveries.map(delivery => <DeliveryItem key={delivery.date} delivery={delivery} product={this.props.product}
            onChange={this.change}
            select={this.select} className="row"></DeliveryItem>)
        }
      </div>
    );
  }

  // item --- IAddress
  select(item) {
    // this.props.select(item);
    // this.setState({selected: v});
  }

  change(){
    // item.quantity = quantity;
    this.props.onChange();
  }
}