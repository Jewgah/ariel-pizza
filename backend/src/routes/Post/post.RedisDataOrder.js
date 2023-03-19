export class RedisDataOrder
{
    constructor(orders)
    {
        this.region = orders._region;
        this.tomatoes = false,
        this.onions = false,
        this.peppers = false,
        this.mushroom = false,
        this.pepperoni = false,
        this.tuna = false,
        this.createdAt = orders._createdAt,
        this.ttl = orders._ttl,
        this.totalOrdersCount = 0,
        this.averageOrderTime = 0,

        this._topping = orders._topping;
        // loop through each topping and create a dynamic property with a boolean value
        this._topping.forEach((topping) => {
        this[`${topping.toLowerCase()}`] = true;
        });
        
    }
}