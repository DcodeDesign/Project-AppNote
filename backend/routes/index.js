const router = require('express').Router();
const auth = require('./auth.route')
const user = require('./user.route')
const note = require('./note.route')
const category = require('./category.route')

router.get('/api', (req, res) => {
    res.status(200).json('true')
})


router.use('/api/auth', auth)
router.use('/api/user', user)
router.use('/api/note', note)
router.use('/api/category', category)



module.exports = router
