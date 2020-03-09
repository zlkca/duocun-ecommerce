import React from 'react';
import { AddressInput } from '../common/AddressInput';
import { AddressList } from '../common/AddressList';
import { DeliveryTimeSelect } from '../common/DeliveryTimeSelect';
import { MerchantGrid } from '../merchant/MerchantGrid';

import { AccountAPI } from '../account/API';
import { LocationAPI } from '../location/API';

export class Home extends React.Component{

  historyLocations = [];
  locationAPI = new LocationAPI();

  constructor(props){
    super(props);
    this.state = {locations: [], address: null, keyword: '', bAddressList: false};
    this.onAddressInputChange = this.onAddressInputChange.bind(this);
    this.onAddressInputClear = this.onAddressInputClear.bind(this);
    this.onAddressListSelect = this.onAddressListSelect.bind(this);
  }

  onAddressInputChange(keyword) {
    if(keyword){
      this.locationAPI.search(keyword, ['_id', 'location']).then(locations => {
        this.setState({locations: locations, address:null, keyword: keyword, bAddressList: true});
      });
    }else{
      this.setState({locations: this.historyLocations, address:null, keyword: keyword, bAddressList: true});
    }
  }

  onAddressInputClear(){
    this.setState({locations: this.historyLocations, address:null, keyword: '', bAddressList: true});
  }

  onAddressInputBack(){
    this.setState({bAddressList: false});
  }

  onAddressListSelect(v){
    const address = this.locationAPI.getAddressString(v.location);
    this.setState({address: address, bAddressList: false});
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
      <div>
        <AddressInput onChange={this.onAddressInputChange} 
          onClear={this.onAddressInputClear}
          onBack={this.onAddressInputBack} 
          input={this.state.address? this.state.address : this.state.keyword}>
        </AddressInput>

        { this.state.bAddressList &&
          <AddressList list={this.state.locations} select={this.onAddressListSelect} selected={this.state.address}></AddressList>
        }
        <DeliveryTimeSelect></DeliveryTimeSelect>
        <MerchantGrid merchants={merchants}></MerchantGrid>
      </div>
    );
  }

  componentDidMount(){
    const accountSvc = new AccountAPI();
    const locationSvc = new LocationAPI();

    accountSvc.getCurrentAccount().then(account => {
      locationSvc.find({accountId: account._id},['_id', 'location']).then(locations => {
        this.historyLocations = locations;
      });
    });


  }
}