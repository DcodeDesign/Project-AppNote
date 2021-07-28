const router = require('express').Router();
const {isLoggedIn} = require('../helpers/jwtVerify')
const Category = require('../models/category.model')


router.get('/getAll', isLoggedIn, async (req, res) => {
    const query = {'user_id': req.user._id};
    const sort = { _id: -1 };
    const limit = 500;
    const cursor =  Category.find(query, {titre: 1, created_at: 1}).sort(sort).limit(limit);
    await cursor.exec((err, note) => {
        if(err){
            res.status(500).json(err)
        } else {
            res.status(200).json(note)
        }

    })
})


router.post('/create', isLoggedIn, (req, res) => {
    const newCategory = new Category({
        user_id: req.user._id.toString(),
        titre: req.body.titre,
        created_at: Date.now()
    })

    newCategory.save(err => {
        if (err) {
            res.status(500).json(err)
        }
        res.status(200).json('category created')
    })
})

module.exports = router
