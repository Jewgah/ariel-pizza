const regions = ["North", "Haifa", "Center", "Dan", "South"];
const toppings = ["Tomato", "Mushroom", "Tuna", "Onion", "Pepperoni", "Black Olives", "Green Olives","Pineapple", "Corn", "Extra Cheese"];
const orderStatus = ["in progress", "completed"];
const maxNumToppings = 4;

const generateOrderId = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  const generateOrder = (branchId) => {
    const orderId = generateOrderId();
    const branchName = `Branch ${branchId}`;
    const region = regions[Math.floor(Math.random() * regions.length)];
    const date = new Date();
    const time = date.toLocaleTimeString();
    const status = orderStatus[Math.floor(Math.random() * orderStatus.length)];
    const orderToppings = [];
    const numToppings = Math.floor(Math.random() * (maxNumToppings - 1) + 1);
    for (let i = 0; i < numToppings; i++) {
        orderToppings.push(toppings[Math.floor(Math.random() * toppings.length)]);
    }

  return {
    orderId,
    branchId,
    branchName,
    region,
    date,
    time,
    status,
    orderToppings
  };
};

const generateData = (numOrders, branchId) => {
    const orders = [];
    for (let i = 0; i < numOrders; i++) {
      orders.push(generateOrder(branchId));
    }
    return orders;
  };

module.exports = { generateData };
