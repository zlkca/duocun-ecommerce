
import { combineReducers } from 'redux'
export const cartReducer= (state = {items:[]}, action)=>{
  switch(action.type){
    case 'ADD_TO_CART':
      return { items: [...state.items, action.payload]};
    case 'REMOVE_FROM_CART':
      const its = state.items && state.items.length > 0 ? state.items.find(it => it.id !== action.payload.id) : [];
      return { items: its };
    break;
  }  
  return state;
}

export default combineReducers({
  cart: cartReducer
})