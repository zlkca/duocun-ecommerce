import React from 'react';
import { Link } from 'react-router-dom';

import { AccountAPI } from '../account/API';
import './Account.scss';
import { Footer } from '../common/Footer';


const Menu = {
  HOME: 'H',
  ORDER_HISTORY: 'OH',
  ACCOUNT: 'A'
}
export class Account extends React.Component {
  accountSvc = new AccountAPI();

  constructor(props) {
    super(props);

    this.state = {
      account: null,
      lang: 'zh',
      orders: [],
      balance: 0
    };
    this.toBalancePage = this.toBalancePage.bind(this);
    this.getDefaultAddress = this.getDefaultAddress.bind(this);
    this.select = this.select.bind(this);
  }

  toBalancePage(){

  }
  
  getDefaultAddress(){

  }

  select(){

  }

  render() {
    const account = this.state.account;
    return (
      <div className="page">
        {
          account &&
          <div className="row head-block">
            <div className="col-8 name-block title-bg">{account.username}</div>
            <div className="col-4 portrait-block">
              {
                account.imageurl &&
                <div className="portrait-frame">
                  <img className="portrait" src={account.imageurl} />
                </div>
              }
            </div>
          </div>

        }
        {
          account &&
          <div className="row balance-block" onClick={this.toBalancePage}>
            <div className="col-12 title-sm">当前余额</div>
            <div className="col-12 title-bg">${account.balance}</div>
            <div className="col-12 title-sm">
              <Link style={{ textDecoration: 'none' }} to={{ pathname: "/balance" }} >
              <span>查看明细</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" fill="#666" />
                <path d="M0 0h24v24H0z" fill="none" />
              </svg>
              </Link>
            </div>
          </div>
        }
        {
          account &&
          <div className="row form-group">
            <div className="row label-sm">
              <span>电话号码</span><span>*</span>
            </div>
            <div className="input" onClick={this.changePhoneNumber}>{account.phone}</div>
          </div>
        }
        {
          account &&
          <div className="row form-group">
            <div className="row label-sm">
              <span>默认地址</span><span>*</span>
            </div>
            <div className="input" onClick={this.changeAddress}>{this.getDefaultAddress()}</div>
          </div>
        }

        {/* <div className="row form-group actions-row">
          <div className="btn btn-primary btn-add-credit" onClick={this.toAddCreditPage}>充值</div>
        </div> */}

        <div className="row form-group actions-row">
          <div className="btn btn-primary btn-logout" onClick={this.logout}>退出</div>
        </div>

        <Footer select={this.select} type="menu" menu={Menu.ACCOUNT} accountId={account ? account._id : ''}></Footer>
      </div>
    )
  }

  componentDidMount() {
    this.accountSvc.getCurrentAccount().then(account => {
      this.setState({ account });
    });
  }
}