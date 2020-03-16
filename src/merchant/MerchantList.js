import React from 'react';
import { Link } from 'react-router-dom';
import { MerchantItem } from './MerchantItem';
import './MerchantList.scss';

export class MerchantList extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    const merchants = this.props.merchants;

    return (
      <div className="merchant-list">
      {
        merchants.map(m => <MerchantItem key={m._id} item={m} />)
      }
      </div>
    )
  }

  // componentDidMount(){
  //   try {
  //     const url = 'http://localhost:8000/merchants';
  //     axios.get(url).then(rs => {
  //       const ms = rs;
  //     });
  //   } catch (e) {
  //     console.log('Load merchants fail');
  //   }
  // }
}