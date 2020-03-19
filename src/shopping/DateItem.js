import React from 'react';
import { AddressItem } from '../common/AddressItem';
import './DateItem.scss';

export class DateItem extends React.Component{
  constructor(props){
    super(props);
    this.select = this.select.bind(this);
    // this.state = {selected: this.props.selected};
  }

  render(){
    // const list = [
    //   {dow: '本周5', date:'1月2日', bPassed:'true'},
    //   {dow: '下周5', date:'1月9日', bPassed:'false'},
    //   {dow: '', date:'1月16日', bPassed:'false'},
    // ]
    return (
      <div className="date-item">
        <div className="date-col">{this.props.date}</div>
        <div className="time-col">{this.props.time}</div>
      </div>
    );
  }

  // item --- IAddress
  select(item){ 
    this.props.select(item);
    // this.setState({selected: v});
  }
}