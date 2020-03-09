import React from 'react';
import './AddressInput.scss';

export class AddressInput extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();

    this.back = this.back.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.clearAddr = this.clearAddr.bind(this);
  }

  onChange(e) {
    const v = e.target.value;
    this.props.onChange(v);
  }

  onFocus(e) {
    const v = e.target.value;
    this.props.onChange(v);
  }

  clearAddr() {
    this.props.onClear();
    // this.inputRef.current.focus();
  }

  back() {
    this.props.onBack();
  }

  render() {
    return (
      <div className="addr-row">
        <div className="back-btn" onClick={this.back}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="#666" d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z" />
            <path fill="none" d="M0 0h24v24H0z" />
          </svg>
        </div>

        <input className="input" ref={this.inputRef} type="text" placeholder="Input Address" value={this.props.input}
          onChange={this.onChange} onFocus={this.onFocus} />

        {/* {this.state.val && */}
        { this.props.input &&
          <div className="clear-btn" onClick={this.clearAddr}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="#666" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              <path d="M0 0h24v24H0z" fill="none" />
            </svg>
          </div>
        }
      </div>
    );
  }  
}