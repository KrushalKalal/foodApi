const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Restaurant = require('../model/restaurantModel');


router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json());


// router.get('/restaurantList', (req, res) => {
//     let query = {}
//     let cityId = Number(req.query.cityId);
//     let optionId = Number(req.query.optionId);
//     if (cityId) {
//         query = { city_id: cityId }
//     } else if (optionId) {
//         query = { "options.option_id": optionId }
//     } else {
//         query = {}
//     }
//     Restaurant.find(query, {}, (err, data) => {
//         if (err) throw err;
//         res.send(data)
//     })
// })

router.get('/restaurantList', async (req, res) => {
    try {
        let query = {}
        let cityId = Number(req.query.cityId);
        let optionId = Number(req.query.optionId);
        if (cityId) {
            query = { city_id: cityId }
        } else if (optionId) {
            query = { "options.option_id": optionId }
        } else {
            query = {}
        }
        const data = await Restaurant.find(query,{});
        res.send(data);
        console.log(data);
    } catch (err) {
        console.log(err);
    }

})
 router.get(`/filter/:optionId`, async (req, res) => {
     try{
        let query = {}
        let sort = { price: 1 }
        let optionId = Number(req.params.optionId);
        let cuisineId = Number(req.query.cuisineId);
        let discountId = Number(req.query.discountId);
        let lcost = Number(req.query.lcost);
        let hcost = Number(req.query.hcost);
        let rating = Number(req.query.rating);
        if (req.query.sort) {
            sort = { price: req.query.sort }
        }
        if (cuisineId && lcost && hcost && discountId && rating) {
            query = {
                "options.option_id": optionId,
                "cuisines.cuisine_id": cuisineId,
                $and: [{ price: { $gt: lcost, $lt: hcost } }],
                "discount.discount_id": discountId,
                $and: [{ rating: { $gt: rating } }]
            }
        }
        else if (cuisineId) {
            query = {
                "options.option_id": optionId,
                "cuisines.cuisine_id": cuisineId
            }
        } else if (lcost && hcost) {
            query = {
                "options.option_id": optionId,
                $and: [{ price: { $gt: lcost, $lt: hcost } }]
            }
        } else if (discountId) {
            query = {
                "options.option_id": optionId,
                "discount.discount_id": discountId
            }
        } else if (rating) {
            query = {
                "options.option_id": optionId,
                $and: [{ rating: { $gt: rating } }]
            }
        }
        else {
            query = {
                "options.option_id": optionId,
            }
        }

        const data = await Restaurant.find(query, {})
            res.send(data)
        console.log(data)
     }catch(err){
         console.log(err);
     }
    
     
    
 })



// router.get('/details/:id', (req, res) => {
//     let id = Number(req.params.id)
//     Restaurant.find({ restaurant_id: id }, (err, data) => {
//         if (err) throw err;
//         res.send(data)
//     })
// })


router.get('/details/:id', async(req,res) => {
    try {
        let id = Number(req.params.id)
        const data = await Restaurant.find({restaurant_id: id  });
        res.send(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    
})      


module.exports = router;