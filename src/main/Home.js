import React from 'react';
// import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { AddressInput } from '../common/AddressInput';
import { AddressList } from '../common/AddressList';
import { MerchantList } from '../merchant/MerchantList';
import { Footer } from '../common/Footer';
import { Progress } from '../common/Progress';
import { updateLocation } from '../actions';

import { AccountAPI } from '../account/API';
import { LocationAPI } from '../location/API';
import { MerchantAPI } from '../merchant/API';

import './Home.scss';

const Menu = {
  HOME: 'H',
  ORDER_HISTORY: 'OH',
  ACCOUNT: 'A'
}
// export interface IAddress{
//   placeId: string;
//   mainText: string;
//   secondaryText: string;
// }

class Home extends React.Component {
  historyLocations = [];
  locationSvc = new LocationAPI();
  accountSvc = new AccountAPI();
  merchantSvc = new MerchantAPI();
  path = '';
  code = '';

  constructor(props) {
    super(props);
    // const loc = useLocation();
    // const { search } = props.location;
    // if(search){
    //   const args = search.substring(1).split('&')[0];
    //   if(args){
    //     this.code = args.code;
    //   }
    // }

    this.state = { loading: false, account: '', addresses: [], address: null, keyword: '', bAddressList: false, merchants: [] };
    this.onAddressInputChange = this.onAddressInputChange.bind(this);
    this.onAddressInputClear = this.onAddressInputClear.bind(this);
    this.onAddressListSelect = this.onAddressListSelect.bind(this);
    this.getAddressInputVal = this.getAddressInputVal.bind(this);
    this.login = this.login.bind(this);
  }

  onAddressInputChange(keyword) {
    if (keyword) {
      if (keyword.length > 3) {
        this.locationSvc.getSuggestAddressList(keyword).then(addresses => {
          this.setState({ addresses: addresses, address: null, keyword: keyword, bAddressList: true });
        });
      } else {
        this.setState({ keyword: keyword });
      }
    } else {
      this.setState({ addresses: this.historyLocations, address: null, keyword: keyword, bAddressList: true });
    }
  }

  onAddressInputClear() {
    this.setState({ addresses: this.historyLocations, address: null, keyword: '', bAddressList: true });
  }

  onAddressInputBack() {
    this.setState({ bAddressList: false });
  }

  // item --- IAddress
  onAddressListSelect(item) {
    this.setState({ address: item, bAddressList: false });
    const address = item.mainText + ' ' + item.secondaryText;
    const placeId = item.placeId;
    const accountId = this.state.account._id;
    this.locationSvc.query(accountId, placeId, address).then((location) => {
      this.props.updateLocation(location);
    });
  }

  getAddressInputVal() {
    const item = this.state.address;
    return item ? item.mainText + ' ' + item.secondaryText : this.state.keyword;
  }

  render() {
    const account = this.state.account;
    return (
      <div className="page">
        {
          this.state.loading &&
          <Progress></Progress>
        }
        <div className="page-content">
          <AddressInput onChange={this.onAddressInputChange}
            onClear={this.onAddressInputClear}
            onBack={this.onAddressInputBack}
            input={this.getAddressInputVal()}>
          </AddressInput>

          {this.state.bAddressList &&
            <AddressList list={this.state.addresses} select={this.onAddressListSelect} selected={this.state.address}></AddressList>
          }
          <MerchantList merchants={this.state.merchants}></MerchantList>
        </div>
        {

          account &&
          <Footer select={this.select} type="menu" menu={Menu.HOME} accountId={account? account._id : '' }></Footer>
        }
      </div>
    );
  }

  login(code) {
    return new Promise((resolve, reject) => {
      this.accountSvc.getCurrentAccount().then(account => {
        if (account) {
          resolve(account);
        } else {
          if (code) { // try wechat login
            this.setState({loading: true});
            this.accountSvc.wxLogin(code).then(r => {
              if (r) {
                this.accountSvc.setAccessTokenId(r.tokenId);
                resolve(r.account);
              } else {
                resolve();
              }
            });
          } else {
            resolve();
          }
        }
      });
    });
  }

  componentDidMount() {
    const search = this.props.location.search ? this.props.location.search : this.props.history.location.search;
    const a = search.substring(1);
    const cs = a.split('&')[0];
    const code = cs.split('=')[1];
    
    this.login(code).then(account => {
      this.setState({account, loading: false});
      if (account) {
        this.locationSvc.getHistoryAddressList({ accountId: account._id }).then(addresses => {
          this.historyLocations = addresses;
        });
      } else {
        this.historyLocations = [];
      }
    });

    this.merchantSvc.quickFind({ type: 'G' }, ['_id', 'name', 'description', 'products', 'pictures']).then(merchants => {
      this.setState({ merchants });
    });
  }
}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps, { updateLocation })(Home);
