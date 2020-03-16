import React from 'react';
import { Link } from 'react-router-dom';
import './MerchantItem.scss';

export class MerchantItem extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    const item = this.props.item
    const url = 'http://localhost:8000/' + item.pictures[0].url;
    return (
      <div className="item">
        <Link style={{ textDecoration: 'none' }} to={{pathname: "/merchant/" + item._id}} >
        <div className="image-col">
          <img src={url} />
        </div>
        <div className="text-col">
          <div className="title-bg">{item.name}
          </div>
          <div className="text-sm">
            {item.description}
          </div>
          <div>详情</div>
        </div>
        </Link>
      </div>
    )
  }
}
