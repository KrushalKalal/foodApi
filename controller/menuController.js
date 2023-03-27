const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Menu = require('../model/menuModel');


router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json());



router.get('/menu/:id', async (req, res) => {
    try {
        let id = Number(req.params.id)
        const data = await Menu.find({ restaurant_id: id });
        res.send(data)
    } catch (err) {
        console.log(err);
    }

})

router.post('/menuItem', async (req, res) => {
    try {
        if (Array.isArray(req.body.id)) {
            const data = await  Menu.find({ menu_id: { $in: req.body.id } });
            res.send(data)
           
        } else {
            res.send("Invalid input");
        }

    } catch (err) {
        console.log(err);
    }
})
// router.post('/menuItem', (req, res) => {
//     if (Array.isArray(req.body.id)) {
//         Menu.find({ menu_id: { $in: req.body.id } }, (err, data) => {
//             if (err) throw err;
//             res.send(data)
//         })
//     } else {
//         res.send("Invalid input");
//     }
// })


module.exports = router;