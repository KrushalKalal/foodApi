const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const City = require('../model/cityModel')

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json());



router.get('/cityList', async(req,res) => {
    try {
        const data = await City.find({ });
        res.send(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    
})      


module.exports = router;