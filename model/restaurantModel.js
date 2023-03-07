const mongoose = require('mongoose');
const restaurantSchema = new mongoose.Schema({
    restaurant_id:Number,
    restaurant_name:String,
    city_id:Number,
    state_id:Number,
    address:String,
    restaurant_img:String,
    price:Number,
    contact:Number,
    rating:Number,
    options:Array,
    cuisines:Array,
    time:Number,
    counter:Number,
    trending_img:String,
    safety_img:String,
    discount:Array,
})

mongoose.model('restaurant',restaurantSchema, 'restaurant');
module.exports = mongoose.model('restaurant')