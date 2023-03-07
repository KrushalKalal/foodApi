const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const User = require('../model/authModel');

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json());



router.get('/users',(req,res) => {
    User.find({},(err,data) => {
        if(err) throw err;
        res.send(data)
    })
})

router.post('/register',(req,res) => {
    let hashPassword = bcrypt.hashSync(req.body.password, 8);
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
        phone:req.body.phone,
        role:req.body.role?req.body.role:'User'
    },(err,data) => {
        if(err) return res.send('Erroe While Register')
        res.send('Registration Successfull')
    })
})


router.post('/login',(req,res) => {
    User.findOne({email:req.body.email},(err,user) => {
        if(err) return res.send({auth:false,token:'Error While Logging'});
        if(!user) return res.send({auth:false,token:'No User Found'})
        else{
            const passIsValid = bcrypt.compareSync(req.body.password,user.password);
            if(!passIsValid) return res.send({auth:false,token:'Invalid Password'})
            let token = jwt.sign({id:user._id},config.secret,{expiresIn:86400}) 
            res.send({auth:true,token:token})
        }
    })
})


router.get('/userInfo',(req,res) => {
    let token = req.headers['x-access-token'];
    if(!token) res.send({auth:false,token:'No Token Provided'})
    jwt.verify(token,config.secret,(err,user) => {
        if(err) return res.send({auth:false,token:'Invalid Token'})
        User.findById(user.id,(err,result) =>{
            res.send(result)
        })
    })
})


module.exports = router;