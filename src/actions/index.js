

// item - eg. {productId:x, date:'2020-03-10', time:'14:00', quantity: 2}
export const addToCart = (item) => {
  return {
    type: 'ADD_TO_CART',
    payload: item
  }
}

// item - eg. {productId:x, date:'2020-03-10', time:'14:00', quantity: 2}
export const removeFromCart = (item) => {
  return {
    type: 'REMOVE_FROM_CART',
    payload: item
  }
}

// item - eg. {productId:x, date:'2020-03-10', time:'14:00', quantity: 2}
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