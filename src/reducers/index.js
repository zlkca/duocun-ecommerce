
import { combineReducers } from 'redux'


const DEFAULT_CART = [];
const DEFAULT_LOCATION = {};
const DEFAULT_MERCHANT = {};

// state --- [{ product, deliveries:[{date, time, quantity}] }]
// payload --- { product:{_id, price, cost, taxRate }, delivery: {date, time, quantity} }
const updateQuantity = (state, payload) => {
    const product = payload.product;
    const date = payload.delivery.date;
    const time = payload.delivery.time;
    const quantity = payload.delivery.quantity;

    const item = state.find(it => it.product && it.product._id === product._id);
    if(item){
      let deliveries = [];
      const found = item.deliveries.find(d => (d.date + d.time) === (date + time));
      if(found){
        item.deliveries.map(d => {
          if ((d.date + d.time) === (date + time)) {
            deliveries.push({ ...d, quantity: quantity});
          } else {
            deliveries.push(d);
          }
        });
      }else{
        deliveries = [...item.deliveries, payload.delivery];
      }
      deliveries = deliveries.filter(d => d.quantity > 0);
      const remain = state.filter(it => it.product && it.product._id !== product._id);
      return [...remain, { product, deliveries }];
    }else{
      const remain = state.filter(it => it.product._id !== product._id);
      const delivery = { ...payload.delivery, quantity: quantity };
      const deliveries = [delivery];

      return [...remain, { product, deliveries }];
    }
    // return state;
}

// action.payload - eg. {product, delivery:{date, time, quantity}}
export const cartReducer = (state = DEFAULT_CART, action) => {
  const payload = action.payload;

  switch (action.type) {
    case 'ADD_TO_CART':
      return updateQuantity(state, payload);

    case 'REMOVE_FROM_CART':
      return updateQuantity(state, payload);

    case 'CHANGE_QUANTITY':
      return updateQuantity(state, payload);

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