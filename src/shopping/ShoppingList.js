import React from 'react';
import { Link } from 'react-router-dom';
import ShoppingItem from './ShoppingItem';

export class ShoppingList extends React.Component{

  constructor(props){
    super(props);
    this.select = this.select.bind(this);
  }


  select(){

  }

  render(){
    return <div className="shopping-list">
          {
            this.props.products.map(p => 
              <Link style={{ textDecoration: 'none' }} to={{pathname: "/delivery/" + p._id}} >
                <ShoppingItem key={p._id} item={p}></ShoppingItem>
              </Link>
            )
          }
        </div>
  }

}