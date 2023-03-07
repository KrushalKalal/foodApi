const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const Order = require('../model/orderModel');

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json());



router.get('/orderList',(req,res) => {
    let email = req.query.email;
    let query = {}
    if(email){
        query = {email:email}

    }
    Order.find(query,{},(err,data) => {
        if(err) throw err;
        res.send(data)
    })
})

router.post('/placeOrder',(req,res) => {
    Order.create({
        order_id: req.body.order_id,
        name: req.body.name,
        restaurant_name:req.body.restaurant_name,
        email: req.body.email,
        address:req.body.address,
        phone:req.body.phone,
        cost:req.body.cost,
        productItem:req.body.productItem,
        status:req.body.status

    },(err,data) => {
        if(err) return res.send('Erroe While Ordering')
        res.send('Order Placed Successfull')
    })
})

router.put('/updateOrder/:id',(req,res)=>{
    let id = Number(req.params.id);
    Order.updateOne(
       {order_id:id},
        {
           $set:{
               "status":req.body.status,
               "bank_name":req.body.bank_name,
               "date":req.body.date
           }
        },(err,result)=>{
           if(err) throw err;
           res.send("Order Updated");
        }
    )
})

router.delete('/deleteOrder/:id',(req,res) => {
    let id =  Number(req.params.id)
    Order.remove({order_id:id},(err,result) => {
      if(err) throw err;
      res.send('Order Deleted')
    })
})

module.exports = router;