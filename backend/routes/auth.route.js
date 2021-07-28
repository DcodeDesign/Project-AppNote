const router = require('express').Router();
const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const saltRounds = 10;
const jwt = require('jsonwebtoken')
const fs = require('fs')
const RSA_PRIVATE_KEY = fs.readFileSync('./rsa/key')
const RSA_PUBLIC_KEY = fs.readFileSync('./rsa/key.pub')

router.post('/signin', (req, res) => {
    User.findOne({'email': req.body.email}).exec((err, user)=>{
        if(user && bcrypt.compareSync(req.body.password, user.password)){
            const token = jwt.sign({}, RSA_PRIVATE_KEY, {
                algorithm: 'RS256',
                expiresIn: '3600s',
                subject: user._id.toString()
            })
            res.status(200).json(token)
        } else {
            res.status(401).json(false)
        }
    })
})

router.post('/signup', (req, res) => {

    console.log(req.body)
    const newUser = new User({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, saltRounds),
        created_at: Date.now()
    })

    User.findOne({'email': req.body.email}).exec((err, user)=>{
        if(user){
            res.status(500).json(false)
        } else {
            newUser.save((err, doc) => {
                if (err) {
                    res.status(500).json(false)
                } else {
                    res.status(200).json(true)
                }
            })
        }
    })
})

router.get('/refresh-token', (req, res, next) => {
    let token = null;
    if (req.headers && req.headers.authorization) {
        var parts = req.headers.authorization.split(' ');
        if (parts.length === 2) {
            let scheme = parts[0];
            let credentials = parts[1];
            if (/^Bearer$/i.test(scheme)) {
                token = credentials;
                jwt.verify(token, RSA_PUBLIC_KEY, (err, decoded) => {
                    if(err){ return res.status(403).json('wrong token')}
                    const newToken = jwt.sign({}, RSA_PRIVATE_KEY, {
                        algorithm: 'RS256',
                        expiresIn: '3600s',
                        subject: decoded.sub
                    })
                    res.status(200).json(newToken)
                })
            } else {
                res.json(403).json(false)
            }
        } else {
            res.json(403).json(false );
        }
    }
})

router.post('/signup', (req, res) => {
    const newUser = new User({
        email: req.body.email,
        name: req.body.name,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8))
    })
    newUser.save((err, doc) => {
        if (err) {
            res.status(500).json(false)
        }else{
            res.status(200).json(doc)
        }

    })
})

module.exports = router
