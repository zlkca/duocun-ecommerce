import React from 'react';
import { connect } from 'react-redux';

import { AddressInput } from '../common/AddressInput';
import { AddressList } from '../common/AddressList';
import { MerchantList } from '../merchant/MerchantList';
import { Footer } from '../common/Footer';

import { updateLocation } from '../actions';


import { AccountAPI } from '../account/API';
import { LocationAPI } from '../location/API';
import { MerchantAPI } from '../merchant/API';

import './Home.scss';

// export interface IAddress{
//   placeId: string;
//   mainText: string;
//   secondaryText: string;
// }

class Home extends React.Component {

  historyLocations = [];
  locationAPI = new LocationAPI();

  constructor(props) {
    super(props);
    this.state = { addresses: [], address: null, keyword: '', bAddressList: false, merchants: [] };
    this.onAddressInputChange = this.onAddressInputChange.bind(this);
    this.onAddressInputClear = this.onAddressInputClear.bind(this);
    this.onAddressListSelect = this.onAddressListSelect.bind(this);
    this.getAddressInputVal = this.getAddressInputVal.bind(this);
  }

  onAddressInputChange(keyword) {
    if (keyword) {
      if (keyword.length > 3) {
        this.locationAPI.getSuggestAddressList(keyword).then(addresses => {
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

    this.locationAPI.query('5cad44629687ac4a075e2f42', placeId, address).then((location) => {
      this.props.updateLocation(location);
    });
  }

  getAddressInputVal() {
    const item = this.state.address;
    return item ? item.mainText + ' ' + item.secondaryText : this.state.keyword;
  }

  render() {
    // const merchants = [
    //   {
    //     id: 1,
    //     name: 'Honda Accord Crosstour',
    //     year: '2017',
    //     model: 'Accord Crosstour',
    //     make: 'Honda'

    //   },
    //   {
    //     id: 2,
    //     name: 'Mercedes-Benz AMG GT Coupe',
    //     year: '2016',
    //     model: 'AMG',
    //     make: 'Mercedes Benz'
    //   }
    // ];

    return (
      <div className="page">
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
        <Footer select={this.select} type="menu"></Footer>
      </div>
    );
  }

  componentDidMount() {
    const accountSvc = new AccountAPI();
    const locationSvc = new LocationAPI();
    const merchantSvc = new MerchantAPI();

    accountSvc.getCurrentAccount().then(account => {
      if (account) {
        locationSvc.getHistoryAddressList({ accountId: account._id }).then(addresses => {
          this.historyLocations = addresses;
        });
      } else {
        this.historyLocations = [];
      }
    });

    merchantSvc.quickFind({ type: 'G' }, ['_id', 'name', 'description', 'products', 'pictures']).then(merchants => {
      this.setState({ merchants });
    });
  }
}


const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps, {updateLocation})(Home);
