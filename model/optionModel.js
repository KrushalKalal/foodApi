const mongoose = require('mongoose');
const optionSchema = new mongoose.Schema({
    option_id:Number,
    type:String,
    content:String,
    option_img:String,
    option_img_alt:String
    
})

mongoose.model('option',optionSchema, 'Option');
module.exports = mongoose.model('option')