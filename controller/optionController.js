const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Option = require('../model/optionModel');


router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json());



router.get('/collectionList',async (req,res) => {
    try {
        const data = await Option.find({ });
        res.send(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
})


module.exports = router;