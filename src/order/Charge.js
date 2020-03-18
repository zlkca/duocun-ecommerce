import React from 'react';
import './Charge.scss';
import { Footer } from '../common/Footer';
// import {ProductAPI} from '../product/API';
// import {MerchantAPI} from '../merchant/API';

export class Charge extends React.Component {
  // productSvc = new ProductAPI();
  // merchantSvc = new MerchantAPI();

  constructor(props) {
    super(props);
  }

  render() {
    const c = this.props.charge;
    const bShowBalance = this.props.bShowBalance;
    return <div className="charge-list">
      <div className="row text-sm">
        <div className="col-12">
          <div className="title-xs">
            <span>商品总额</span>:
          </div>
          <div className="text-xs">&nbsp;${c.price}</div>
        </div>

        <div className="col-12">
          <div className="title-xs">
            <span>运费</span>:
          </div>
          <div className="text-xs">&nbsp;${c.deliveryCost}</div>
        </div>

        {/* <div className="col-12">
          <div className="title-xs">
            <span>小计</span>:
          </div>
          <div className="text-xs">&nbsp;${c.price}</div>
        </div> */}

        <div className="col-12">
          <div className="title-xs">
            <span>税费</span>:
          </div>
          <div className="text-xs">&nbsp;${c.tax}</div>
        </div>

        <div className="col-12">
          <div className="title-xs">
            <span>小费</span>:
          </div>
          <div className="text-xs">&nbsp;${c.tips}</div>
        </div>

        <div className="col-12">
          <div className="title-xs">
            <span>运费折扣</span>:</div>
          <div className="text-xs">-${c.deliveryDiscount}</div>
        </div>

        {
          c.overRangeCharge > 0 &&
          <div className="col-12">
            <div className="title-xs">
              <span>超范围服务费</span>:</div>
            <div className="text-xs">&nbsp;${c.overRangeCharge}</div>
          </div>
        }

        <div className="col-12 total-row">
          <div className="title-xs">
            <span>总计</span>:</div>
          <div className="text-xs">&nbsp;${c.total}</div>
        </div>

        {
          bShowBalance && c.balance !== 0 &&
          <div className="col-12">
            <div className="title-xs">
              <span>当前余额</span>:
            </div>

            <div className="text-xs">
              {
                c.balance > 0 &&
                <span>&nbsp;${c.balance}</span>
              }

              {
                c.balance < 0 &&
                <span><span>-</span>${Math.abs(c.balance)}</span>
              }
            </div>
          </div>
        }

        {
          bShowBalance &&
          <div className="col-12 total-row">
            <div className="title-xs">
              <span>总共应付</span>:
            </div>
            <div className="text-xs">&nbsp;${c.payable}</div>
          </div>
        }
      </div>
    </div>
  }
}