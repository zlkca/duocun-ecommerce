import React from 'react';
import './Footer.scss';
import { Link } from 'react-router-dom';

export class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return <div className="footer" onClick={this.select}>
      <Link style={{ textDecoration: 'none' }} to={{pathname: "/food-delivery"}} className="col" >送餐</Link>
      <Link style={{ textDecoration: 'none' }} to={{pathname: "/"}} className="col" >送菜</Link>
      <Link style={{ textDecoration: 'none' }} to={{pathname: "/history"}} className="col" >History</Link>
      <Link style={{ textDecoration: 'none' }} to={{pathname: "/account"}} className="col" >Account</Link>
    </div>
  }

}