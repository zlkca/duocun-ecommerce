import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';

import { Home } from './main/Home';
import { Merchant } from './merchant/Merchant';
import { Order } from './order/Order';
import { Footer } from './common/Footer';
import { OrderHistory } from './order/OrderHistory';
import { Account } from './account/Account';


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
        
        <Router>
            <Route exact path="/" component={Home} />
            <Route path="/merchant/:id" component={Merchant} />
            <Route path="/order" component={Order} />
            <Route path="/history" component={OrderHistory} />
            <Route path="/account" component={Account} />
            <Footer select={this.select}></Footer>
        </Router>
        
      </div>
    );
  }
}

export default App;
