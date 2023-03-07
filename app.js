let express = require('express');
let app = express();

const mongoose = require('mongoose');

let morgan = require('morgan');
let dotenv = require('dotenv');
dotenv.config();
const port = 5000;
const hostname = 'localhost';
let cors = require('cors');
let bodyParser = require('body-parser');;
let mongoUrl = "mongodb+srv://shoppinghub:shoppinghub123@cluster0.w4byv.mongodb.net/zomato?retryWrites=true&w=majority";

app.use(morgan('common'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send("Response from xomato");

})

const AuthController = require('./controller/authController');
app.use('/api/auth',AuthController);

const CityController = require('./controller/cityController');
app.use('/api',CityController)

const RestaurantController = require('./controller/restaurantController');
app.use('/api',RestaurantController)

const OptionController = require('./controller/optionController');
app.use('/api',OptionController)

const MenuController = require('./controller/menuController');
app.use('/api',MenuController)

const OrderController = require('./controller/orderController');
app.use('/api',OrderController)

mongoose.connect(mongoUrl,
    { useNewUrlParser: true, useUnifiedTopology: true }
).then(client => {
    app.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`)
    });
}).catch(err => {
    console.log(err);
})