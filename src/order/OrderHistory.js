import React from 'react';
import './OrderHistory.scss';
import * as moment from 'moment';
import Pagination from 'react-js-pagination';
import { Progress } from '../common/Progress';
import { Footer } from '../common/Footer';
import { OrderHistoryItem } from './OrderHistoryItem';
import { OrderAPI } from './API';
import { AccountAPI } from '../account/API';
import { OrderType } from './Model';

const Menu = {
  HOME: 'H',
  ORDER_HISTORY: 'OH',
  ACCOUNT: 'A'
}

export class OrderHistory extends React.Component {
  orderSvc = new OrderAPI();
  // paymentSvc = new PaymentAPI();
  accountSvc = new AccountAPI();
  accountId;
  nOrders = 0;
  itemsPerPage = 10;
  lang = 'zh';

  constructor(props) {
    super(props);

    this.accountId = props.match.params.accountId;  

    this.state = {
      account: '',
      lang: 'zh',
      orders: [],
      activePage: 1,
      loading: false
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.getDescription = this.getDescription.bind(this);
  }

  getDescription(order) {
    const d = order.delivered.split('T')[0];
    const m = +(d.split('-')[1]);
    const prevMonth = m === 1 ? 12 : (m - 1);

    // const product = order.items[0].product;
    // const productName = this.lang === 'en' ? product.name : product.nameEN;
    const range = prevMonth + '/27 ~ ' + m + '/26';

    if (order.type === OrderType.MOBILE_PLAN_MONTHLY) {
      return range + (this.lang === 'en' ? ' Phone monthly fee' : ' 电话月费');
    // } else if (order.type === 'MS') {
    //   return (this.lang === 'en' ? ' Phone setup fee' : ' 电话安装费');
    } else {
      return '';
    }
  }

  handlePageChange(pageNumber) {
    const accountId = this.accountId;
    this.setState({loading: true});
    this.orderSvc.loadPage({ clientId: accountId }, pageNumber, this.itemsPerPage).then(ret => {
      ret.orders.map(order => {
        order.description = this.getDescription(order);
        if (this.lang === 'en') {
          order.merchantName = order.merchant ? order.merchant.nameEN : '';
          order.items.map(item => {
            item.product.name = item.product.nameEN;
          });
        }
      });

      this.nOrders = ret.total;
      this.setState({loading: false, orders: ret.orders, activePage: pageNumber});
    });
  }

  render() {
    const orders = this.state.orders;
    return (

      <div className="page">
      {
        this.state.loading &&
        <Progress></Progress>
      }
        <div className="title-row">订单历史</div>
        <div className="page-body">
          {
            !orders || orders.length === 0 &&
            <div className="empty-order">
              <div className="order-image">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path fill="none" d="M0 0h24v24H0V0z" />
                  <path d="M7 15h7v2H7zm0-4h10v2H7zm0-4h10v2H7zm12-4h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-.14 0-.27.01-.4.04-.39.08-.74.28-1.01.55-.18.18-.33.4-.43.64-.1.23-.16.49-.16.77v14c0 .27.06.54.16.78s.25.45.43.64c.27.27.62.47 1.01.55.13.02.26.03.4.03h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7-.25c.41 0 .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75zM19 19H5V5h14v14z" />
                </svg>
              </div>
              <span>你还没有任何订单，去逛逛吧。</span>
            </div>
          }

          {
            orders && orders.length > 0 &&
            <div className="order-list">
            {
              this.state.orders.map(order => 
                <OrderHistoryItem item={order}></OrderHistoryItem>
              )
            }
            </div>
          }

          {
            orders && orders.length > 0 &&
            <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={this.itemsPerPage}
            totalItemsCount={this.nOrders}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange.bind(this)}
            />
          }

      </div>
      <Footer select={this.select} type="menu" menu={Menu.ORDER_HISTORY}></Footer>
    </div >
    )
  }

  onCreditCardChange(e) {
    this.setState({ stripe: e.stripe, card: e.card });
  }

  componentDidMount() {
    if (this.accountId) {
      const accountId = this.accountId;
      const pageNumber = 1;
      this.setState({loading: true});
      this.orderSvc.loadPage({ clientId: accountId }, pageNumber, this.itemsPerPage).then(ret => {
        ret.orders.map(order => {
          order.description = this.getDescription(order);
          if (this.lang === 'en') {
            order.merchantName = order.merchant ? order.merchant.nameEN : '';
            order.items.map(item => {
              item.product.name = item.product.nameEN;
            });
          }
        });

        this.nOrders = ret.total;
        this.setState({loading: false, orders: ret.orders, activePage: pageNumber});
      });
    }
  }

}