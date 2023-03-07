const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    order_id:Number,
    name:String,
    restaurant_name:String,
    email:String,
    address:String,
    phone:Number,
    cost:Number,
    status:String,
    bank_name:String,
    date:String,
    productItem:Array,
})

mongoose.model('orders',orderSchema, 'orders');
module.exports = mongoose.model('orders')