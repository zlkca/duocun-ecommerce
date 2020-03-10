import React from 'react';
import { AddressInput } from '../common/AddressInput';
import { AddressList } from '../common/AddressList';
import { DeliveryTimeSelect } from '../common/DeliveryTimeSelect';
import { MerchantGrid } from '../merchant/MerchantGrid';

import { AccountAPI } from '../account/API';
import { LocationAPI } from '../location/API';

import './Home.scss';

// export interface IAddress{
//   placeId: string;
//   mainText: string;
//   secondaryText: string;
// }

export class Home extends React.Component {

  historyLocations = [];
  locationAPI = new LocationAPI();

  constructor(props) {
    super(props);
    this.state = { addresses: [], address: null, keyword: '', bAddressList: false };
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
      }else{
        this.setState({keyword: keyword});
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
  }

  getAddressInputVal(){
    const item = this.state.address;
    return item ? item.mainText + ' ' + item.secondaryText : this.state.keyword;
  }

  render() {
    const merchants = [
      {
        id: 1,
        name: 'Honda Accord Crosstour',
        year: '2017',
        model: 'Accord Crosstour',
        make: 'Honda'

      },
      {
        id: 2,
        name: 'Mercedes-Benz AMG GT Coupe',
        year: '2016',
        model: 'AMG',
        make: 'Mercedes Benz'
      }
    ];

    return (
      <div class="page">
        <AddressInput onChange={this.onAddressInputChange}
          onClear={this.onAddressInputClear}
          onBack={this.onAddressInputBack}
          input={this.getAddressInputVal()}>
        </AddressInput>

        {this.state.bAddressList &&
          <AddressList list={this.state.addresses} select={this.onAddressListSelect} selected={this.state.address}></AddressList>
        }
        <DeliveryTimeSelect></DeliveryTimeSelect>
        <MerchantGrid merchants={merchants}></MerchantGrid>
      </div>
    );
  }

  componentDidMount() {
    const accountSvc = new AccountAPI();
    const locationSvc = new LocationAPI();

    accountSvc.getCurrentAccount().then(account => {
      if(account){
        locationSvc.getHistoryAddressList({ accountId: account._id }).then(addresses => {
          this.historyLocations = addresses;
        });
      }else{
        this.historyLocations = [];
      }
    });
  }
}