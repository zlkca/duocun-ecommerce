import React from 'react';
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
    // const loactionSvc = new LocationAPI();
    // const s = store.getState();
    // const location = s.location;
    // const merchant = s.merchant;
    this.state = {
      account: '',
      lang: 'zh',
      orders: [],
      balance: 0
      // merchant,
      // location,
      // paymentMethod: PaymentMethod.WECHAT,
      // phone: '123456',
      // address: loactionSvc.toAddressString(location),
      // items: [{ productName: '土豆', quantity: 3, price: 0.5 }],
      // stripe: null,
      // card: null,
      // order: null,
      // cart: s.cart
    };
    this.toBalancePage = this.toBalancePage.bind(this);
    this.getDefaultAddress = this.getDefaultAddress.bind(this);
    this.select = this.select.bind(this);
    // this.getAddressInputVal = this.getAddressInputVal.bind(this);

  }

  toBalancePage(){

  }
  
  getDefaultAddress(){

  }

  select(){

  }

  render() {
    return (
      <div className="page">
        {
          this.state.account &&
          <div className="row head-block">
            <div className="col-8 name-block title-bg">{this.state.account.username}</div>
            <div className="col-4 portrait-block">
              {
                this.state.account.imageurl &&
                <div className="portrait-frame">
                  <img className="portrait" src={this.state.account.imageurl} />
                </div>
              }
            </div>
          </div>

        }
        {
          <div className="row balance-block" onClick={this.toBalancePage}>
            <div className="col-12 title-sm">当前余额</div>
            <div className="col-12 title-bg">${this.state.balance}</div>
            <div className="col-12 title-sm">
              <span>查看明细</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" fill="#666" />
                <path d="M0 0h24v24H0z" fill="none" />
              </svg>
            </div>
          </div>
        }
        {
          this.state.account &&
          <div className="row form-group">
            <div className="row label-sm">
              <span>电话号码</span><span>*</span>
            </div>
            <div className="input" onClick={this.changePhoneNumber}>{this.state.account.phone}</div>
          </div>
        }
        {
          this.state.account &&
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

        <Footer select={this.select} type="menu" menu={Menu.ACCOUNT} accountId={this.state.account._id}></Footer>
      </div>
    )
  }

  componentDidMount() {
    this.accountSvc.getCurrentAccount().then(account => {
      this.setState({ account });
    });
  }
}