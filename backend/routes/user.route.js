const router = require('express').Router();
const {isLoggedIn} = require('../helpers/jwtVerify')


router.get('/current', isLoggedIn,(req, res) => {
    res.json(req.user)
})

module.exports = router
