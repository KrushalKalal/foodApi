const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const User = require('../model/authModel');

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json());



router.get('/users',async(req,res) => {
     try{
         const data = await User.find({})
         res.send(data)
     } catch(err){
         console.log(err)
     }
})


router.post('/register',async (req,res) => {
    try{
        let hashPassword = bcrypt.hashSync(req.body.password, 8);
        const data = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword,
            phone:req.body.phone,
            role:req.body.role?req.body.role:'User'
        })
        res.send("Registration successful")
    }catch(err){
        console.log(err)
    }
   
})


router.post('/login',async (req,res) => {
    try{
         const data = await User.findOne({email:req.body.email});
            // if(err) return res.send({auth:false,token:'Error While Logging'});
            if(!data){
                res.send({auth:false,token:'No User Found'})
            }else{
                const passIsValid = bcrypt.compareSync(req.body.password,data.password);
                if(!passIsValid) return res.send({auth:false,token:'Invalid Password'})
                let token = jwt.sign({id:data._id},config.secret,{expiresIn:86400}) 
                res.send({auth:true,token:token})
            }
        console.log(data)
    }catch(err){
        console.log(err)
    }
  
})


 router.get('/userInfo',async (req,res) => {
     try{
        let token = req.headers['x-access-token'];
        const user = await User.findOne({});
        if(!token) res.send({auth:false,token:'No Token Provided'})
         jwt.verify(token,config.secret,async (err,user) => {
            if(err) return res.send({auth:false,token:'Invalid Token'})
            const result = await User.findById(user.id)
                res.send(result)
        })
     }catch(err){
         console.log(err)
     }
    //  let token = req.headers['x-access-token'];
    //  if(!token) res.send({auth:false,token:'No Token Provided'})
    //  jwt.verify(token,config.secret,(err,user) => {
    //      if(err) return res.send({auth:false,token:'Invalid Token'})
    //      User.findById(user.id,(err,result) =>{
    //          res.send(result)
    //      })
    //  })
 })


module.exports = router;