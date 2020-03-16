import React from 'react';
import { Link } from '../react-router-dom';
import { Merchant } from './Merchant';
import axios from 'axios';

export class MerchantGrid extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    const merchants = this.props.merchants;

    return merchants.map(m => {
        return (<div key={m.id}>
                  <Link style={{ textDecoration: 'none' }} to={{pathname: "/merchant/" + m.id}} key={m.id}>{ m.name }
                  </Link>
                </div>)
        })
      
  }

  componentDidMount(){
    try {
      const url = 'http://localhost:8000/merchants';
      axios.get(url).then(rs => {
        const ms = rs;
      });
    } catch (e) {
      console.log('Load merchants fail');
    }
  }
}