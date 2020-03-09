import React from 'react';
import { AddressInput } from '../common/AddressInput';
import { AddressList } from '../common/AddressList';
import { DeliveryTimeSelect } from '../common/DeliveryTimeSelect';
import { MerchantGrid } from '../merchant/MerchantGrid';

import { AccountAPI } from '../account/API';
import { LocationAPI } from '../location/API';

export class Home extends React.Component{
  constructor(props){
    super(props);
    this.state = {places: [], place: null, keyword: '', bAddressList: false};
    this.onAddressInputChange = this.onAddressInputChange.bind(this);
    this.onAddressInputClear = this.onAddressInputClear.bind(this);
    this.onAddressListSelect = this.onAddressListSelect.bind(this);
  }

  onAddressInputChange(keyword) {
    if(keyword){
      this.setState({places: ['suggest 1', 'suggest 2'], place:null, keyword: keyword, bAddressList: true});
    }else{
      this.setState({places: ['history 1', 'history 2'], place:null, keyword: keyword, bAddressList: true});
    }
  }

  onAddressInputClear(){
    this.setState({places: ['history 1', 'history 2'], place:null, keyword: '', bAddressList: true});
  }

  onAddressInputBack(){
    this.setState({bAddressList: false});
  }

  onAddressListSelect(v){
    this.setState({place: v, bAddressList: false});
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
          input={this.state.place? this.state.place : this.state.keyword}>
        </AddressInput>

        { this.state.bAddressList &&
          <AddressList list={this.state.places} select={this.onAddressListSelect} selected={this.state.place}></AddressList>
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
        const loc = locations;
      });
    });


  }
}