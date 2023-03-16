

export class RedisDataOrder
{
    constructor(orders)
    {
        // this.averageTimeOrder,
        // this.openOrders,
        // this.todayOrders,
        this.tomatoes = false,
        this.onions = false,
        this.peppers = false,
        this.mushroom = false,
        this.pepperoni = false,
        this.tuna = false,
        // this.ttl,
        // this.createdAt,
        
        this._topping = orders._topping;
        // loop through each topping and create a dynamic property with a boolean value
        this._topping.forEach((topping) => {
        this[`${topping.toLowerCase()}`] = true;
        });
        
    }



}