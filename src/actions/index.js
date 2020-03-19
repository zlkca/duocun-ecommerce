

// item - {product:{_id, price, cost, taxRate }, delivery: {date, time, quantity} }
export const addToCart = (item) => {
  return {
    type: 'ADD_TO_CART',
    payload: item
  }
}

// item - {product:{_id, price, cost, taxRate }, delivery: {date, time, quantity} }
export const removeFromCart = (item) => {
  return {
    type: 'REMOVE_FROM_CART',
    payload: item
  }
}

// item - {product:{_id, price, cost, taxRate }, delivery: {date, time, quantity} }
export const changeQuantity = (item) => {
  return {
    type: 'CHANGE_QUANTITY',
    payload: item
  }
}

export const updateLocation = (loc) => {
  return {
    type: 'UPDATE_LOCATION',
    payload: loc
  }
}

export const updateMerchant = (merchant) => {
  return {
    type: 'UPDATE_MERCHANT',
    payload: merchant
  }
}