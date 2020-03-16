import React from 'react';
import { AccountType, VerificationError } from './Model';
import { AccountAPI } from './API';
import './Phone.scss';

export class Phone extends React.Component {
  lang = 'zh';
  accountSvc = new AccountAPI();

  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      verificationCode: '',
      verified: false,
      account: null,
      bAllowVerify: false,
      bRequireSignup: false
    };
    this.onPhoneInput = this.onPhoneInput.bind(this);
    this.onVerificationCodeInput = this.onVerificationCodeInput.bind(this);
    this.sendVerify = this.sendVerify.bind(this);
  }
  componentDidMount() {
    this.accountSvc.getCurrentAccount().then(account => {
      this.setState({ account });
    });
  }
  render() {
    return (
      <div className="phone-form">
        <div className="dialog-head">
          <div className="title-bg">电话号码验证</div>
        </div>
        <div className="dialog-body">
          <div className="row label-sm verify-hint">
            <span>*为了在配送时能联系到您, 我们需要验证您的手机号码。</span>
          </div>

          <form>
            <div className="row form-group">
              <div className="col-12 label-sm">
                <span>手机号码</span><span>*</span>
              </div>
              <input className="phone" type="tel" maxlength="10" pattern="[0-9]*" onInput={this.onPhoneInput} />
              {/* <input className="phone" name="phone" type="tel" maxlength="10" pattern="[0-9]*" value={this.state.phone} onChange={this.onPhoneInput} /> */}
              <div className="btn get-code-btn" onClick={this.sendVerify}>发送验证码</div>
            </div>

            <div className="row form-group">
              <div className="col-12 label-sm">
                <span>验证码</span>
                <span>*</span>
              </div>
              <input className="verification-code" type="number" pattern="[\d]*" onChange={this.onVerificationCodeInput} />

              <div className="verification-result">
                {
                  this.state.verified &&
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path fill="#0F9D58" d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
                  </svg>
                }
              </div>

            </div>
            {
              // this.phoneMatchedAccount && this.phoneMatchedAccount.type === 'tmp' && verified &&
              // <div className="row form-group signup-block">
              //     <div className="btn btn-primary signup-btn" onClick={signup} >注册并继续</div>
              //   </div>
            }

          </form>
        </div>
      </div>
    )
  }

  verifyPhoneNumber(accountId, account) {
    if (accountId) {
      if (account) {
        if (account.type === AccountType.TEMP) {
          if (accountId === account._id) {
            return VerificationError.NONE;
          } else {
            return VerificationError.PHONE_NUMBER_OCCUPIED;
          }
        } else {
          if (accountId === account._id) {
            return VerificationError.NONE;
          } else {
            return VerificationError.PHONE_NUMBER_OCCUPIED;
          }
        }
      } else {
        return VerificationError.NONE;
      }
    } else {
      return VerificationError.NONE;
    }
  }

  onPhoneInput(e) {
    const v = e.target.value;
    if (v && v.length >= 10) {
      let phone = v.substring(0, 2) === '+1' ? v.substring(2) : v;
      phone = phone.match(/\d+/g).join('');

      this.setState({ phone });
      this.accountSvc.find({ phone: phone }).then(accounts => {
        const account = (accounts && accounts.length > 0) ? accounts[0] : null;
        const accountId = this.state.account ? this.state.account._id : '';
        const err = this.verifyPhoneNumber(accountId, account);

        if (err === VerificationError.PHONE_NUMBER_OCCUPIED) {
          const s = this.lang === 'en' ? 'This phone number has already bind to an wechat account, please try use wechat to login.' :
            '该号码已经被一个英文版的账号使用，请使用英文版登陆; 如果想更改账号请联系客服。';
          alert(s);
          this.setState({ bAllowVerify: false });
        } else {
          this.setState({ bAllowVerify: true });
        }

        // if (self.account) { // if logged in
        //   if (accounts && accounts.length > 0) { // db has accounts with this number
        //     const account: IAccount = accounts[0];
        //     this.phoneMatchedAccount = account; // if phoneMatchedAccount.type === tmp,  display signup button
        //     if (account._id !== self.account._id) {
        //       const hint = this.lang === 'en' ? 'This phone number has already bind to an wechat account,
        //  please try use wechat to login.' :
        //         '该号码已经被一个英文版的账号使用，请使用英文版登陆; 如果想更改账号请联系客服。';
        //       alert(hint);
        //       this.bAllowVerify = false;
        //     } else {
        //       this.bAllowVerify = true;
        //     }
        //   } else { // there is no account occupy this phone number
        //     this.bAllowVerify = true;
        //   }
        // } else { // did not login yet
        //   if (accounts && accounts.length > 0) { // there is account occupy this phone number
        //     const account: IAccount = accounts[0];
        //     this.phoneMatchedAccount = account; // if phoneMatchedAccount.type === tmp,  display signup button

        //     if (this.lang === 'en') {
        //       if (account.openId) { // weixin occupy this phone number
        //         alert('This phone number has already bind to an wechat account, please try use wechat to login.');
        //         this.bAllowVerify = false;
        //       } else {
        //         this.bAllowVerify = true;
        //       }
        //     } else {
        //       if (!account.openId) { // english account occupy this phone number
        //         alert('该号码已经被一个英文版的账号使用，请使用英文版登陆; 如果想更改账号请联系客服。');
        //         this.bAllowVerify = false;
        //       } else {
        //         this.bAllowVerify = true;
        //       }
        //     }
        //   } else {
        //     this.bAllowVerify = true;
        //   }
        // }
      });
    } else { // input less than 10 chars
      this.bAllowVerify = false;
      this.phoneMatchedAccount = null; // if phoneMatchedAccount.type === tmp,  display signup button
    }
  }

  showError(err) {
    let s = '';
    if (err === VerificationError.PHONE_NUMBER_OCCUPIED) {
      s = this.lang === 'en' ? 'This phone number has already bind to an wechat account, please try use wechat to login.' :
        '该号码已经被一个英文版的账号使用，请使用英文版登陆; 如果想更改账号请联系客服。';
    } else if (err === VerificationError.NO_PHONE_NUMBER_BIND) {
      s = this.lang === 'en' ? 'login with phone number failed, please contact our customer service' :
        '使用该电话号码登陆失败，请联系客服';
    } else if (err === VerificationError.WRONG_CODE) {
      s = this.lang === 'en' ? 'verification code is wrong, please try again.' : '验证码错误，请重新尝试';
    }

    if (s) {
      // this.snackBar.open('', s, { duration: 1500 });
    }
  }

  onVerificationCodeInput(e) {
    const self = this;
    const { phone, account } = this.state;
    // phone = phone.substring(0, 2) === '+1' ? phone.substring(2) : phone;
    // phone = phone.match(/\d+/g).join('');

    if (e.target.value && e.target.value.length === 4) {
      const code = e.target.value;
      const accountId = account ? account._id : '';
      this.accountSvc.verifyAndLogin(phone, code, accountId).then((r) => {
        // self.verified = r.verified;
        if (r.err === VerificationError.NONE) {
          const account = r.account;
          // self.authSvc.setAccessTokenId(r.tokenId);
          // self.dialogRef.close(account);
          this.setState({ verified: r.verified });
          this.props.onClose();
        } else if (r.err === VerificationError.REQUIRE_SIGNUP) {
          // self.phoneMatchedAccount = r.account; // display signup button
          this.setState({ bRequireSignup: true });
        } else {
          this.showError(r.err);
        }
      });
      // this.accountSvc.verifyCode(phone, code).then(verified => {
      //   this.verified = verified;
      //   if (verified) {
      //     if (self.account && self.account.type !== 'tmp') { // user, client
      //       self.accountSvc.getCurrentAccount().then((account: IAccount) => {
      //         self.dialogRef.close(account);
      //       });
      //     } else {
      //       const hint = this.lang === 'en' ? 'login with phone number failed, please contact our customer service' :
      //         '使用该电话号码登陆失败，请联系客服';

      //       self.accountSvc.loginByPhone(phone, code).then((tokenId: string) => {
      //         if (tokenId) {
      //           self.authSvc.setAccessTokenId(tokenId);
      //           self.accountSvc.getCurrentAccount().then((account: IAccount) => {
      //             if (account) {
      //               if (account.type === 'tmp') {
      //                 self.phoneMatchedAccount = account; // if phoneMatchedAccount.type === tmp,  display signup button
      //               } else {
      //                 self.dialogRef.close(account);
      //               }
      //             } else {
      //               alert(hint);
      //             }
      //           });
      //         } else {
      //           alert(hint);
      //         }
      //       });
      //     }
      //   } else {
      //     const hintVerify = this.lang === 'en' ? 'verification code is wrong, please try again.' : '验证码错误，请重新尝试';
      //     alert(hintVerify);
      //   }
      // });
    } else {
      // this.verified = false;
      this.setState({ verified: false });
    }
  }

  sendVerify() {
    if (this.state.bAllowVerify) {
      const phone = this.state.phone;
      const account = this.state.account;
      // phone = phone.substring(0, 2) === '+1' ? phone.substring(2) : phone;
      // phone = phone.match(/\d+/g).join('');
      // this.resendVerify(phone).then(tokenId => {

      // });
      const accountId = account ? account._id : '';
      const successHint = this.lang === 'en' ? 'SMS Verification Code sent' : '短信验证码已发送';
      const failedHint = this.lang === 'en' ? 'Account issue, please contact our customer service。' : '账号有问题，请联系客服';

      // this.bGettingCode = false;
      // this.verified = false;
      // this.verificationCode.patchValue('');

      // tslint:disable-next-line:no-shadowed-variable
      // return new Promise((resolve, reject) => {
      this.accountSvc.sendVerifyMsg(accountId, phone, this.lang).then((tokenId) => {
        // this.snackBar.open('', successHint, { duration: 1000 });
        // this.bGettingCode = true;
        if (tokenId) { // to allow api call
          // self.authSvc.setAccessTokenId(tokenId);
        } else {
          alert(failedHint);
        }
        // resolve(tokenId);
      });
      // });
    }
  }

  resendVerify(phone) {
    const self = this;
    const accountId = self.account ? self.account._id : '';
    const successHint = this.lang === 'en' ? 'SMS Verification Code sent' : '短信验证码已发送';
    const failedHint = this.lang === 'en' ? 'Account issue, please contact our customer service。' : '账号有问题，请联系客服';

    // this.bGettingCode = false;
    // this.verified = false;
    // this.verificationCode.patchValue('');

    // tslint:disable-next-line:no-shadowed-variable
    return new Promise((resolve, reject) => {
      this.accountSvc.sendVerifyMsg(accountId, phone, this.lang).then((tokenId) => {
        // this.snackBar.open('', successHint, { duration: 1000 });
        // this.bGettingCode = true;
        if (tokenId) { // to allow api call
          // self.authSvc.setAccessTokenId(tokenId);
        } else {
          alert(failedHint);
        }
        resolve(tokenId);
      });
    });
  }


  signup() {
    const self = this;
    const phone = this.form.value.phone;
    const code = this.form.value.verificationCode;
    if (phone && code) {
      this.accountSvc.signup(phone, code).then((tokenId) => {
        if (tokenId) {
          // self.authSvc.setAccessTokenId(tokenId);
          self.accountSvc.getCurrentAccount().then((account) => {
            if (account) {
              this.props.onClose();
              // self.dialogRef.close(account);
              // self.rx.dispatch({ type: AccountActions.UPDATE, payload: account });
            }
            // this.snackBar.open('', 'Signup successful', { duration: 1000 });
          });
        } else {

        }
      });
    } else {
      // fail to signup
    }
  }
}