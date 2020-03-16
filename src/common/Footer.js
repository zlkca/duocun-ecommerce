import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

export class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {total: 0};
    this.next = this.next.bind(this);
  }

  render(){
    return <div className="footer" onClick={this.select}>
    {
      this.props.type === 'menu' &&
      <div className="menu-footer">
        <Link style={{ textDecoration: 'none' }} to={{pathname: "/food-delivery"}} className="col" >送餐</Link>
        <Link style={{ textDecoration: 'none' }} to={{pathname: "/"}} className="col" >送菜</Link>
        <Link style={{ textDecoration: 'none' }} to={{pathname: "/history"}} className="col" >History</Link>
        <Link style={{ textDecoration: 'none' }} to={{pathname: "/account"}} className="col" >Account</Link>
      </div>
    }
    {
      this.props.type === 'button' &&
      <div className="btn-footer" onClick={this.select}>
        <div className="row btn-row">
          <div className="col cart-col">&nbsp;</div>
          <div className="col price-col">
            ${this.state.total}
          </div>
          <div className="col btn-col" onClick={this.next} >
            <Link style={{ textDecoration: 'none' }} to={{pathname: this.props.pathname}} >
              下一步
            </Link>
          </div>
        </div>
      </div>
    }
    </div>
  }

  next(){
    if(this.props.onNext){
      this.props.onNext();
    }
  }

}