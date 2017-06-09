"use strict";
/**
 * api.js
 *
 * @description Route handler for the root level of the API.
 * @since 0.0.1.
 * @author Nicolas GIGOU.
 */

const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const SYS = require('../utils/system');
const JWT = require('jsonwebtoken'); // used to create, sign, and verify tokens
const USER = require('../models/user'); // get our MONGOOSE model

ROUTER.get('/', (req, res) => {
    res.json("Ok for HOST/api/");
});

ROUTER.post('/authenticate', (req, res) => {
    // find the user
    USER.findOne({
        name: req.body.name
    }, (err, user) => {

        if (err) { throw err; }

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {

            // check if password matches
            if (user.password !== req.body.password) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {

                // if user is found and password is right
                // create a token
                let token = JWT.sign(user, SYS.CONSTANTS.SECRET, {
                    expiresIn: 86400 // expires in 24 hours
                });

                res.json({
                    success: true,
                    token: token
                });
            }

        }

    });
});

module.exports = ROUTER;