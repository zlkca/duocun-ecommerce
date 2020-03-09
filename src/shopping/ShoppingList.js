import React from 'react';
import ShoppingItem from './ShoppingItem';

export class ShoppingList extends React.Component{

  constructor(props){
    super(props);
    this.select = this.select.bind(this);
  }


  select(){

  }

  render(){
    const products = [
      {id: 1, name: 'P 1'}, 
      {id: 2, name: 'P 2'},
      {id: 2, name: 'P 3'}
    ];

    return <div className="shopping-list">
          {
            products.map(p => <ShoppingItem item={p}></ShoppingItem>)
          }
        </div>
  }

}