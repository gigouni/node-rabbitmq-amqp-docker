"use strict";
/**
 * Message publisher - Sender.
 *
 * @author Nicolas GIGOU <nicolas.gigou [at] gmail.com>
 * @date 30/05/2017
 * @see https://www.rabbitmq.com/tutorials/tutorial-one-javascript.html
 */

const SYS           = require('./utils/system');
const BODY_PARSER   = require('body-parser');
const LOGGER        = require('morgan');
const MONGOOSE      = require('mongoose');
// const JWT           = require('jsonwebtoken');
const API_ROOT      = require('./routes/api');
const API_SEND      = require('./routes/send');
const EXPRESS       = require('express');
let app             = EXPRESS();

MONGOOSE.connect(SYS.CONSTANTS.API_DATABASE); // connect to database

// use body parser so we can get info from POST and/or URL parameters
app.use(BODY_PARSER.urlencoded({ extended: false }));
app.use(BODY_PARSER.json());

// use LOGGER to log requests to the console
app.use(LOGGER('dev'));

/*app.use((req, res, next) => {

    // check header or url parameters or post parameters for token
    let token = req.body.token || req.param('token') || req.headers['x-access-token'];

    // decode token
    if (token) {

        // verifies secret and checks exp
        JWT.verify(token, SYS.CONSTANTS.API_SECRET, (err, decoded) => {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.', error: err });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }

});*/

app.use('/api', API_ROOT);
app.use('/api/send', API_SEND);

app.listen(SYS.CONSTANTS.API_PORT);
console.log(`Magic happens at ${SYS.CONSTANTS.API_HOST}:${SYS.CONSTANTS.API_PORT}`);






