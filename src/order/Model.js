


export const OrderType = {
  FOOD_DELIVERY: 'F',
  MOBILE_PLAN_SETUP: 'MS',
  MOBILE_PLAN_MONTHLY: 'MM',
  GROCERY: 'G'
};

export const OrderStatus = {
  BAD: 'B',          // client return, compansate
  DELETED: 'D',          // cancellation
  TEMP: 'T',             // generate a temp order for electronic order
  NEW: 'N',
  LOADED: 'L',           // The driver took the food from Merchant
  DONE: 'F',             // Finish delivery
  MERCHANT_CHECKED: 'MC'  // VIEWED BY MERCHANT
};
