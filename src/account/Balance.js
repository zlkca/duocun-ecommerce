import React from 'react';
import Pagination from 'react-js-pagination';

import { AccountAPI } from '../account/API';
import { TransactionAPI, TransactionAction } from '../transaction/API';
import './Balance.scss';
import { Footer } from '../common/Footer';
import { OrderType } from '../order/Model';

const Menu = {
  HOME: 'H',
  ORDER_HISTORY: 'OH',
  ACCOUNT: 'A'
}
export class Balance extends React.Component {
  accountSvc = new AccountAPI();
  transactionSvc = new TransactionAPI();
  nTransactions = 0;
  itemsPerPage = 10;

  constructor(props) {
    super(props);

    this.state = {
      account: '',
      lang: 'zh',
      transactions: [],
      balance: 0
    };
    this.toBalancePage = this.toBalancePage.bind(this);
    this.getDefaultAddress = this.getDefaultAddress.bind(this);
    this.select = this.select.bind(this);
    this.getShortDescription = this.getShortDescription.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.getDescription = this.getDescription.bind(this);
    this.toDateString = this.toDateString.bind(this);
  }

  toBalancePage() {

  }

  getDefaultAddress() {

  }

  select() {

  }

  toDateString(s){
    const t = s.split('.')[0];
    return t.split('T')[0];
  }

  getShortDescription(description) {
    return description.length > 13 ? (description.slice(0, 11) + '..') : description;
  }


  getDescription(t, clientId) {
    if (t.actionCode === TransactionAction.CANCEL_ORDER_FROM_DUOCUN.code ) { // 'client cancel order from duocun') {
      const toName = t.toName ? t.toName : '';
      return (this.lang === 'en' ? 'Cancel' : '取消') + toName;
    } else if (t.actionCode === TransactionAction.PAY_BY_CARD.code ) { // 'pay by card') {
      return (this.lang === 'en' ? 'by bank card' : '银行卡付款');
    } else if (t.actionCode === TransactionAction.PAY_BY_WECHAT.code ) { // 'pay by wechat') {
      return (this.lang === 'en' ? 'wechat pay' : '微信付款');
    } else if (t.actionCode === TransactionAction.ADD_CREDIT_BY_CASH.code ) { // 'client add credit by cash') {
      return (this.lang === 'en' ? 'add credit' : '现金充值');
    } else if (t.actionCode === TransactionAction.ADD_CREDIT_BY_CARD.code ) { // 'client add credit by card') {
      return (this.lang === 'en' ? 'add credit' : '信用卡充值');
    } else if (t.actionCode === TransactionAction.ADD_CREDIT_BY_WECHAT.code ) { // 'client add credit by WECHATPAY') {
      return (this.lang === 'en' ? 'add credit' : '微信充值');
    } else {
      const fromId = t.fromId ? t.fromId : '';
      const toName = t.toName ? t.toName : '';
      const fromName = t.fromName ? t.fromName : '';
      const name = fromId === clientId ? toName : fromName;
      if (t.orderType === OrderType.MOBILE_PLAN_MONTHLY) {
        return name + (this.lang === 'en' ? ' Phone monthly fee' : ' 电话月费');
      } else if (t.orderType === OrderType.MOBILE_PLAN_SETUP) {
        return name + (this.lang === 'en' ? ' Phone setup fee' : ' 电话安装费');
      } else {
        return name + ' ' + (t.note ? t.note : ''); // fix me
      }
    }
  }
  handlePageChange(pageNumber) {
    this.setState({loading: true});
      const clientId = this.state.account._id;
      const query = { $or: [{ fromId: clientId }, { toId: clientId }], amount: { $ne: 0 } };
      this.transactionSvc.loadPage(query, pageNumber, this.itemsPerPage).then(ret => {
        this.nTransactions = ret.total;
        const list = [];
        ret.transactions.map(t => {
          const b = t.fromId === clientId ? t.fromBalance : t.toBalance;
          const description = this.getDescription(t, clientId);
          const consumed = t.toId === clientId ? t.amount : 0;
          const paid = t.fromId === clientId ? t.amount : 0;
          list.push({ date: t.created, description, consumed, paid, balance: -b });
        });
        this.setState({loading: false, transactions: list, activePage: pageNumber});
      });
  }

  render() {
    return (
      <div className="page">
        <div className="row title-row">
          <div className="col-12 title-bg">余额明细</div>
        </div>

        <div className="page-body">
          <div className="balance-list">
            <div className="row list-head">
              <div className="col-3 title-xs">日期</div>
              <div className="col-3 title-xs">描述</div>
              <div className="col-2 title-xs">应付增加</div>
              <div className="col-2 title-xs">应付减少</div>
              <div className="col-2 title-xs">应付</div>
            </div>
            <div className="list-body">
            {
              this.state.transactions.map(tr =>
                <div className="list-item">
                  <div className="row">
                    <div className="col-3">
                      <span className="text-xs">{this.toDateString(tr.date)}</span>
                    </div>
                    <div className="col-3">
                      <span className="text-xs">{this.getShortDescription(tr.description)}</span>
                    </div>
                    <div className="col-2">
                      <span className="text-xs">{tr.consumed}</span>
                    </div>
                    <div className="col-2">
                      <span className="text-xs">{tr.paid}</span>
                    </div>
                    <div className="col-2">
                      <span className="text-xs">{tr.balance}</span>
                    </div>
                  </div>
                </div>
              )
            }
            </div>
          </div>

          <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={this.itemsPerPage}
          totalItemsCount={this.nTransactions}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange.bind(this)}
          />
        </div>
        <Footer select={this.select} type="menu" menu={Menu.ACCOUNT} accountId={this.state.account._id}></Footer>
      </div>
    )
  }

  componentDidMount() {
    this.accountSvc.getCurrentAccount().then(account => {
      this.setState({loading: true});
      const clientId = account._id;
      const query = { $or: [{ fromId: clientId }, { toId: clientId }], amount: { $ne: 0 } };
      const pageNumber = 1;
      this.transactionSvc.loadPage(query, pageNumber, this.itemsPerPage).then(ret => {
        this.nTransactions = ret.total;
        const list = [];
        ret.transactions.map(t => {
          const b = t.fromId === clientId ? t.fromBalance : t.toBalance;
          const description = this.getDescription(t, clientId);
          const consumed = t.toId === clientId ? t.amount : 0;
          const paid = t.fromId === clientId ? t.amount : 0;
          list.push({ date: t.created, description, consumed, paid, balance: -b });
        });
        this.setState({account, loading: false, transactions: list, activePage: pageNumber});
      });
    });
  }
}