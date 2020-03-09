import React from 'react';
import { LocationAPI } from '../location/API';

export class AddressItem extends React.Component {
  locationAPI = new LocationAPI();

  constructor(props) {
    super(props);
    this.select = this.select.bind(this);
    this.getAddressString = this.getAddressString.bind(this);
  }

  render(){
    return <div onClick={this.select}>{this.getAddressString(this.props.data.location)}</div>
  }

  select(){
    this.props.select(this.props.data);
  }

  getAddressString(location){
    return this.locationAPI.getAddressString(location);
  }
}