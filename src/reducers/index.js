
import { combineReducers } from 'redux'


const DEFAULT_CART = [];
const DEFAULT_LOCATION = {};
const DEFAULT_MERCHANT = {};

// state --- {productId, deliveries }
// payload --- { productId, productName, date, time, quantity, price, cost }
const updateQuantity = (state, payload, quantity) => {

    const item = state.find(it => it.productId === payload.productId);
    if(item){
      let deliveries = [];
      const found = item.deliveries.find(it => (it.date + it.time) === (payload.date + payload.time));
      if(found){
        item.deliveries.map(it => {
          if ((it.date + it.time) === (payload.date + payload.time)) {
            deliveries.push({ ...it, quantity: quantity});
          } else {
            deliveries.push(it);
          }
        });
      }else{
        deliveries = [...item.deliveries, { ...payload, quantity: quantity }];
      }
      deliveries = deliveries.filter(d => d.quantity > 0);
      const arr = state.filter(it => it.productId !== payload.productId);
      return [...arr, { productId: payload.productId, productName: payload.productName, deliveries }];
    }else{
      const arr = state.filter(it => it.productId !== payload.productId);
      const delivery = { ...payload, quantity: quantity };
      delete delivery.productName;
      const deliveries = [delivery];
      return [...arr, { productId: payload.productId, productName: payload.productName, deliveries }];
    }
    // return state;
}

// action.payload - eg. {productId:x, date:'2020-03-10', time:'14:00', quantity: 2}
export const cartReducer = (state = DEFAULT_CART, action) => {
  const payload = action.payload;

  switch (action.type) {
    case 'ADD_TO_CART':
      return updateQuantity(state, payload, payload.quantity + 1);

    case 'REMOVE_FROM_CART':
      return updateQuantity(state, payload, payload.quantity - 1);

    case 'CHANGE_QUANTITY':
      return updateQuantity(state, payload, payload.quantity);

    default:
      return state;
  }
}

export const locationReducer = (state = DEFAULT_LOCATION, action) => {
  const payload = action.payload;
  switch(action.type){
    case 'UPDATE_LOCATION':
      return payload;
    default:
      return state;
  }
}
export const merchantReducer = (state = DEFAULT_MERCHANT, action) => {
  const payload = action.payload;
  switch(action.type){
    case 'UPDATE_MERCHANT':
      return payload;
    default:
      return state;
  }
}
export default combineReducers({
  cart: cartReducer,
  location: locationReducer,
  merchant: merchantReducer
})