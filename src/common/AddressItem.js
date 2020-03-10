import React from 'react';
import './AddressItem.scss';

export class AddressItem extends React.Component {

  constructor(props) {
    super(props);
    this.select = this.select.bind(this);
  }

  render() {
    return (
      <div class="list-item" onClick={this.select}>
        <div class="left-col">
          <div class="text-md first-row">{this.props.item.mainText}</div>
          <div class="text-sm second-row">{this.props.item.secondaryText}</div>
        </div>
        <div class="right-col">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="none" d="M0 0h24v24H0V0z" />
            <path fill="#555555" d="M16 18H6V8h3v4.77L15.98 6 18 8.03 11.15 15H16v3z" />
          </svg>
        </div>
      </div>
    );
  }

  select() {
    this.props.select(this.props.item);
  }
}