import React from 'react';
export class CategoryList extends React.Component{

  constructor(props){
    super(props);
    this.select = this.select.bind(this);
  }


  select(){

  }

  render(){
    const categories = [
      {id: 1, name: 'Cat 1'}, 
      {id: 2, name: 'Cat 2'},
      {id: 2, name: 'Cat 3'}
    ];
    return <div className="category-list">
    {
      categories.map(c => <div key={c.id} onClick={this.select}>{c.name}</div>)
    }
    </div>
  }

}