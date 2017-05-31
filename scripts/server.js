/**
 * server.js.
 * Entry point of the server side application.
 *
 * @date 31/05/2017.
 * @author Nicolas GIGOU.
 * @description The server settings.
 */

const LOGGER        = require('morgan');
const BODY_PARSER   = require('body-parser');
const CONSTANTS     = require('../utils/constants');
const EXPRESS       = require('express');
const JWT           = require('express-jwt');
const APP           = EXPRESS();

APP.use(LOGGER('dev'));
APP.use(BODY_PARSER.json());

// Test if the server is running correctly
APP.get('/', (req, res) => {
        res.json({status: "OK", code: 200});
    }
);

// Try to access to a protected (by JWT) route
APP.get('/protected', JWT({secret: CONSTANTS.SECRET_JWT_KEY}), (req, res) => {
        // If the secret string isn't correct, returns an error
        if (!req.user.admin) {
            return res.sendStatus(401);
        }
        // Else returns a correct and "authenticate" access
        res.sendStatus(200);
    }
);

APP.listen(CONSTANTS.PORT, () => console.log(`Server running on ${CONSTANTS.HOST}:${CONSTANTS.PORT}`));

module.exports = APP;