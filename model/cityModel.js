const mongoose = require('mongoose');
const citySchema = new mongoose.Schema({
     city_id:Number,
     city_name:String,
     state_id:Number,
     state_name:String,
     country_name:String
    
})

mongoose.model('city',citySchema, 'city');
module.exports = mongoose.model('city')