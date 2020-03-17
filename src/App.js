import React from 'react';
// import logo from './logo.svg';

import 'bootstrap/dist/css/bootstrap.min.css';
// import './common/Modal.scss';
import './App.scss';

import { BrowserRouter, Route } from 'react-router-dom';

import Home from './main/Home';
import Merchant from './merchant/Merchant';
import { Order } from './order/Order';
import { OrderHistory } from './order/OrderHistory';
import { Account } from './account/Account';
import { Delivery } from './shopping/Delivery';

class App extends React.Component {
  constructor(props){
    super(props);
    this.select = this.select.bind(this);
  }
  select(e){

  }
  render(){
    return (
      <div className="App">
        
        <BrowserRouter>
            <Route path="/food-delivery" component={() => {
              window.location.href = "http://localhost:5000"; // "https://duocun.ca";
              return null;
            }} />
            
            <Route exact path="/" component={Home} />
            <Route path="/merchant/:id" component={Merchant} />
            <Route path="/order" component={Order} />
            <Route path="/delivery/:id" component={Delivery} />
            <Route path="/history/:accountId" component={OrderHistory} />
            <Route path="/account" component={Account} />
            {/* <Route path="/history" component={() => {
              window.location.href = "http://localhost:3001/history";// "https://duocun.ca";
              return null;
            }} />
            <Route path="/account" component={() => {
              window.location.href = "http://localhost:3001/account";// "https://duocun.ca";
              return null;
            }} /> */}

        </BrowserRouter>
        
      </div>
    );
  }
}

export default App;
