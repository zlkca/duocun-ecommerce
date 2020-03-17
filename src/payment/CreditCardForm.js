import React from 'react';
import './CreditCardForm.scss';

import {CardElement, ElementsConsumer} from '@stripe/react-stripe-js';

export class CreditCardForm extends React.Component {
  constructor(props){
    super(props);
    // const {error, paymentMethod} = await 
    // stripe.createPaymentMethod({
    //   type: 'card',
    //   card: elements.getElement(CardElement),
    // }).then(x => {
    //   const r = x;
    // });
    this.change = this.change.bind(this);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const {stripe, elements} = this.props;
    // const {error, paymentMethod} 
    stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    }).then(r => {
      
    });
  };

  render() {
    const options = { 
      hidePostalCode: true, 
      style: {
        base: {
          color: '#32325d',
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: 'antialiased',
          fontSize: '16px',
          '::placeholder': {
            color: '#aab7c4'
          }
        },
        invalid: {
          color: '#fa755a',
          iconColor: '#fa755a'
        }
      } 
    };

    return (
      <form onSubmit={this.handleSubmit}>
        <CardElement onChange={this.change} options={options}/>
        {/* <button type="submit" disabled={!stripe}>
          Pay
        </button> */}
      </form>
    );
  }

  change(e){
    const {stripe, elements} = this.props;
    const card = elements.getElement(CardElement);
    this.props.onChange({e, stripe, card});
  }

  componentDidMount() {
    const {stripe, elements} = this.props;
    // const merchantId = this.props.match.params.id;
    // this.merchantSvc.getById(merchantId).then(merchant => {
    //   this.productSvc.quickFind({merchantId},['_id', 'name', 'price']).then(products => {
    //     this.setState({products, merchant});
    //   });
    // });
  }
}

export class InjectedCheckoutForm extends React.Component {
  constructor(props){
    super(props);
    // const {error, paymentMethod} = await 
    // stripe.createPaymentMethod({
    //   type: 'card',
    //   card: elements.getElement(CardElement),
    // }).then(x => {
    //   const r = x;
    // });
    this.change = this.change.bind(this);
  }
  change(e){
    this.props.onChange(e);
  }
  render(){
    return <ElementsConsumer>
    {
      ({stripe, elements}) => (
        <CreditCardForm stripe={stripe} elements={elements} onChange={this.change}/>
      )
    }
  </ElementsConsumer>
  }
}
