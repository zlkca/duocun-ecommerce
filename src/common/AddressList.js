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
        this.props.list.map(item => <AddressItem key={item._id} select={this.select} data={item}></AddressItem>)
      }
      </div>
    );
  }

  select(v){
    this.props.select(v);
    // this.setState({selected: v});
  }
}