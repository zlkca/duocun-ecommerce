import React from 'react';
import './PaymentMethodSelect.scss';
import {PaymentMethod} from '../payment/API';
export class PaymentMethodSelect extends React.Component {

  constructor(props) {
    super(props);
    this.state = { iconColor: '#000', lang: 'zh', paymentMethod: PaymentMethod.CREDIT_CARD };
  }
  select(paymentMethod, e) {
    this.setState({paymentMethod});
    this.props.onSelect(paymentMethod);
  }
  render() {
    const paymentMethod = this.state.paymentMethod;
    return (
      <div className="btn-group">
        {
          <div className={paymentMethod === PaymentMethod.CASH ? 'btn-toggle active' : 'btn-toggle'} onClick={this.select.bind(this, PaymentMethod.CASH)} >
            <div className="inner">
              <div className="payment-icon i-cash">
                <svg xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 0 24 24" width="22">
                  <path fill="orange" d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"
                  />
                  <path d="M0 0h24v24H0z" fill="none" />
                </svg>
              </div>
              <div className="title">现金支付</div>
            </div>
          </div>
        }

        {
          this.state.lang === 'zh' &&
          <div className={paymentMethod === PaymentMethod.WECHAT ? 'btn-toggle active' : 'btn-toggle'} onClick={this.select.bind(this, PaymentMethod.WECHAT)}>
            <div className="inner">
              <div className="payment-icon i-wechat">
                <svg className="icon" viewBox="0 0 1144 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="21" height="21">
                  <path fill="green" d="M436.314353 632.771765c-68.517647 36.321882-78.667294-20.389647-78.667294-20.389647l-85.835294-190.524236c-33.039059-90.533647 28.581647-40.839529 28.581647-40.839529s52.856471 38.038588 93.003294 61.229176c40.086588 23.190588 85.835294 6.806588 85.835294 6.806589l561.212235-246.362353C936.899765 80.112941 765.891765 0 572.235294 0 256.180706 0 0 213.232941 0 476.310588c0 151.311059 84.811294 285.967059 216.937412 373.248l-23.792941 130.288941s-11.625412 38.038588 28.611764 20.389647c27.437176-12.047059 97.370353-55.115294 138.992941-81.347764 65.445647 21.684706 136.734118 33.731765 211.486118 33.731764 316.024471 0 572.235294-213.232941 572.235294-476.310588 0-76.197647-21.594353-148.178824-59.843764-212.028235-178.808471 102.309647-594.733176 340.118588-648.312471 368.489412z"></path>
                </svg>
              </div>
              <div className="title">微信支付</div>
            </div>
          </div>
        }

        {
          <div className={paymentMethod === PaymentMethod.CREDIT_CARD ? 'btn-toggle active' : 'btn-toggle'} onClick={this.select.bind(this, PaymentMethod.CREDIT_CARD)} >
            <div className="inner">
              <div className="payment-icon i-card">
                <svg xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 0 22 22" width="22">
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path fill="orange" d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
                </svg>
              </div>
              <div className="title" >信用卡</div>
            </div>
          </div>
        }
      </div>
    );
  }



  // getIconColor(paymentMethod) {
  //   if (paymentMethod === 'cash') {
  //     return 'orange';
  //   } else if (paymentMethod === 'WECHATPAY') {
  //     return 'green';
  //   } else {
  //     return 'orange';
  //   }
  // }
}

