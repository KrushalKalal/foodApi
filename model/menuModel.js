const mongoose = require('mongoose');
const menuSchema = new mongoose.Schema({
    menu_id:Number,
    menu_name:String,
    description:String,
    restaurant_id:Number,
    menu_image:String,
    menu_type:String,
    menu_price:String
    
})

mongoose.model('menu',menuSchema, 'menu');
module.exports = mongoose.model('menu')