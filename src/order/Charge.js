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

    const c = this.props.charge;

    this.state = {
      price: c.price, deliveryCost: 0, deliveryDiscount: c.deliveryDiscount,
      tax: c.tax, tips: c.tips, total: c.total, overRangeCharge: c.overRangeCharge, balance: c.balance,
      payable: c.payable
    };

    this.comfirm = this.confirm.bind(this);
    // this.onAddressInputClear = this.onAddressInputClear.bind(this);
    // this.onAddressListSelect = this.onAddressListSelect.bind(this);
    // this.getAddressInputVal = this.getAddressInputVal.bind(this);
    // const s = store.getState();

    // balance >= charge.total ? 0 : charge.total - balance
  }

  render() {
    return <div className="charge-list">
      <div className="row text-sm">
        <div className="col-12">
          <div className="title-xs">
            <span>商品总额</span>:
          </div>
          <div className="text-xs">&nbsp;${this.state.price}</div>
        </div>

        <div className="col-12">
          <div className="title-xs">
            <span>运费</span>:
          </div>
          <div className="text-xs">&nbsp;$0</div>
        </div>

        <div className="col-12">
          <div className="title-xs">
            <span>小计</span>:
          </div>
          <div className="text-xs">&nbsp;${this.state.price}</div>
        </div>

        <div className="col-12">
          <div className="title-xs">
            <span>税费</span>:
          </div>
          <div className="text-xs">&nbsp;${this.state.tax}</div>
        </div>

        <div className="col-12">
          <div className="title-xs">
            <span>小费</span>:
          </div>
          <div className="text-xs">&nbsp;${this.state.tips}</div>
        </div>

        <div className="col-12">
          <div className="title-xs">
            <span>运费折扣</span>:</div>
          <div className="text-xs">-${this.state.deliveryDiscount}</div>
        </div>

        {
          this.state.overRangeCharge > 0 &&
          <div className="col-12">
            <div className="title-xs">
              <span>超范围服务费</span>:</div>
            <div className="text-xs">&nbsp;${this.state.overRangeCharge}</div>
          </div>
        }

        <div className="col-12 total-row">
          <div className="title-xs">
            <span>总计</span>:</div>
          <div className="text-xs">&nbsp;${this.state.total}</div>
        </div>

        {/* {
          // this.state.balance !== 0 &&
          <div className="col-12">
            <div className="title-xs">
              <span>当前余额</span>:
            </div>

            <div className="text-xs">
              {
                // this.state.balance >= 0 &&
                <span>&nbsp;${this.state.balance}</span>
              }

              {
                this.state.balance < 0 &&
                <span><span>-</span>${this.state.balance}</span>
              }
            </div>
          </div>
        } */}

        {
          this.balance !== 0 &&
          <div className="col-12 total-row">
            <div className="title-xs">
              <span>总共应付</span>:
            </div>
            <div className="text-xs">&nbsp;${this.state.payable}</div>
          </div>
        }
      </div>
    </div>
  }

  // componentDidMount() {
  //   const merchantId = this.props.match.params.id;
  //   this.merchantSvc.getById(merchantId).then(merchant => {
  //     this.productSvc.quickFind({merchantId},['_id', 'name', 'price']).then(products => {
  //       this.setState({products, merchant});
  //     });
  //   });
  // }

  confirm() {

  }
}