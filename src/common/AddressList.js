import React from 'react';
import { AddressItem } from './AddressItem';
import './AddressList.scss';

export class AddressList extends React.Component{
  constructor(props){
    super(props);
    this.select = this.select.bind(this);
    this.state = {selected: this.props.selected};
  }

  render(){
    return (
      <div className="address-list">
      {
        this.props.list && this.props.list.length > 0 &&
        this.props.list.map(item => <AddressItem key={item.placeId} select={this.select} item={item}></AddressItem>)
      }
      </div>
    );
  }

  // item --- IAddress
  select(item){ 
    this.props.select(item);
    // this.setState({selected: v});
  }
}