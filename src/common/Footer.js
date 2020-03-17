import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

const Menu = {
  HOME: 'H',
  ORDER_HISTORY: 'OH',
  ACCOUNT: 'A'
}

export class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.select = this.select.bind(this);
  }

  render() {
    const selected = this.props.menu;

    return <div className="footer" onClick={this.select}>
      {
        this.props.type === 'menu' &&
        
        <div className="row bottom-btn bottom-nav-menus">
        {/* <Link style={{ textDecoration: 'none' }} to={{ pathname: "/food-delivery" }} className="col" >送餐</Link> */}

            <div className={selected === Menu.HOME ? 'menu active' : 'menu'} onClick={() => this.select(Menu.HOME)}>
              <Link style={{ textDecoration: 'none' }} to={{ pathname: "/" }}>
                <div className="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
                    <path fill='none' d="M0 0h24v24H0V0z" />
                    <path fill={selected === Menu.HOME ? '#4285F3' : '#333'} d="M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" />
                  </svg>
                </div>
                <div className="icon-text">送菜</div>
              </Link>
            </div>

            {/* <div className={selected === Menu.HOME ? 'menu active' : 'menu'}>
      <div className="icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path fill="none" d="M0 0h24v24H0V0z"/>
      <path d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
      </svg>
      </div>
      <div className="icon-text" i18n="@@Grocery">Grocery</div>
    </div> */}

            <div className={selected === Menu.ORDER_HISTORY ? 'menu active' : 'menu'} onClick={() => this.select(Menu.ORDER_HISTORY)}>
              <Link style={{ textDecoration: 'none' }} to={{ pathname: "/history/" + this.props.accountId }} >
                <div className="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
                    <path fill="none" d="M0 0h24v24H0V0z" />
                    <path fill={selected === Menu.ORDER_HISTORY ? '#4285F3' : '#333'} d="M7 15h7v2H7zm0-4h10v2H7zm0-4h10v2H7zm12-4h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-.14 0-.27.01-.4.04-.39.08-.74.28-1.01.55-.18.18-.33.4-.43.64-.1.23-.16.49-.16.77v14c0 .27.06.54.16.78s.25.45.43.64c.27.27.62.47 1.01.55.13.02.26.03.4.03h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7-.25c.41 0 .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75zM19 19H5V5h14v14z" />
                  </svg>
                </div>
                <div className="icon-text">订单历史</div>
              </Link>
            </div>

            <div className={selected === Menu.ACCOUNT ? 'menu active' : 'menu'} onClick={() => this.select(Menu.ACCOUNT)}>
              <Link style={{ textDecoration: 'none' }} to={{ pathname: "/account" }} >
                <div className="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
                    <path fill="none" d="M0 0h24v24H0V0z" />
                    <path fill={selected === Menu.ACCOUNT ? '#4285F3' : '#333'} d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 10c2.7 0 5.8 1.29 6 2H6c.23-.72 3.31-2 6-2m0-12C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
                <div className="icon-text">帐号</div>
              </Link>
            </div>

          </div>
      }
      {
        this.props.type === 'button' &&
        <div className="row bottom-bar">
          {/* <div className="col cart-col">&nbsp;</div> */}
          <div className="amount-col">
            {this.props.amount ? '$' + this.props.amount : '' }
          </div>
          <div className="bottom-btn btn-col" onClick={this.next} >
            <Link style={{ textDecoration: 'none' }} to={{ pathname: this.props.pathname }} >
              下一步
            </Link>
          </div>
        </div>
      }
    </div>
  }

  next() {
    if (this.props.onNext) {
      this.props.onNext();
    }
  }

  select(menu) {
    this.selected = menu;
  }
}