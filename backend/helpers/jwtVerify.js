const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const RAS_PUBLIC_KEY = fs.readFileSync('./rsa/key.pub')

module.exports = {
    isLoggedIn: (req, res, next) => {
        let token = null;
        if (req.headers && req.headers.authorization) {
            let parts = req.headers.authorization.split(' ');
            if (parts.length === 2) {
                let scheme = parts[0];
                let credentials = parts[1];
                if (/^Bearer$/i.test(scheme)) {
                    token = credentials;
                    if(token){
                        jwt.verify(token, RAS_PUBLIC_KEY, (err, decoded) => {
                            if (err) {
                                res.status(401).json('Not Token')
                            }
                            const sub = decoded.sub
                            User.findOne({'_id': sub}).exec((err, user) => {
                                if (err || !user) {
                                    res.status(401).json('Error')
                                }
                                req.user = user;
                                next();
                            })
                        })
                    } else {
                        res.status(401).json('Not Token')
                    }
                } else {
                    res.json(403).json({message: 'Format is Authorization: Bearer [token]'});
                }
            } else {
                res.json(403).json({message: 'Format is Authorization: Bearer [token]'});
            }

        }
    }
}


