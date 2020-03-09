import React from 'react';

export class AddressItem extends React.Component {
  constructor(props) {
    super(props);
    this.select = this.select.bind(this);
  }

  render(){
    return <div onClick={this.select}>{this.props.data}</div>
  }

  select(){
    this.props.select(this.props.data);
  }
}