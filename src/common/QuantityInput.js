import React from 'react';
import './QuantityInput.scss';

export class QuantityInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {val: this.props.val};
    this.inputRef = React.createRef();

    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);
    this.change = this.change.bind(this);
  }

  increase() {
    this.setState({val: this.state.val + 1});
    this.props.onIncrease(this.state.val);
  }

  decrease() {
    if(this.state.val > 0){
      this.setState({val: this.state.val - 1});
    }
    this.props.onDecrease(this.state.val);
  }

  change() {
    this.props.onChange(this.state.val);
  }

  render() {
    return (

      <div className="quantity-ctrl">
        <div className="increase-btn" onClick={this.increase}>
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
            <path fill="none" d="M0 0h24v24H0V0z" />
            <path fill="#0F9D58" d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
            />
          </svg>
        </div>
        
        <input className="quantity-input" type="number" value={this.state.val} onChange={this.change} />

        <div class="decrease-btn" onClick={this.decrease}>
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
            <path fill="none" d="M0 0h24v24H0V0z" />
            <path fill="#F4B400" d="M7 11v2h10v-2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
          </svg>
        </div>
      </div>
      // <div className="addr-row">
      //   <div className="back-btn" onClick={this.back}>
      //     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      //       <path fill="#666" d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z" />
      //       <path fill="none" d="M0 0h24v24H0z" />
      //     </svg>
      //   </div>

      //   <input className="input" ref={this.inputRef} type="text" placeholder="Input Address" value={this.props.input}
      //     onChange={this.onChange} onFocus={this.onFocus} />

      //   { this.props.input &&
      //     <div className="clear-btn" onClick={this.clearAddr}>
      //       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      //         <path fill="#666" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
      //         <path d="M0 0h24v24H0z" fill="none" />
      //       </svg>
      //     </div>
      //   }
      // </div>
    );
  }  
}