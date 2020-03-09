import React from 'react';

export class AddressItem extends React.Component {

  constructor(props) {
    super(props);
    this.select = this.select.bind(this);
  }

  render(){
    return <div onClick={this.select}>
        <div>{this.props.item.mainText}</div>
        <div>{this.props.item.secondaryText}</div>
      </div>
  }

  select(){
    this.props.select(this.props.item);
  }
}