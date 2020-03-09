import React from 'react';
import {CategoryList} from '../shopping/CategoryList';
import {ShoppingList} from '../shopping/ShoppingList';
import './Merchant.scss';

export class Merchant extends React.Component{
  render() {
    const id = this.props.match.params.id;
    return <div className="page-body">
      <div class="title-row">Merchant {id}</div>
      <CategoryList></CategoryList>
      <ShoppingList></ShoppingList>
    </div>
  }
}