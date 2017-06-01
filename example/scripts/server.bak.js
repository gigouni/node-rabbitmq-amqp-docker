// =================================================================
// get the packages we need ========================================
// =================================================================
const EXPRESS = require('express');
let app = EXPRESS();
const BODY_PARSER = require('body-parser');
const MORGAN = require('morgan');
const MONGOOSE = require('mongoose');

const JWT = require('jsonwebtoken'); // used to create, sign, and verify tokens
const CONFIG = require('../utils/config'); // get our config file
const USER_MODEL = require('../models/user'); // get our mongoose model

// =================================================================
// configuration ===================================================
// =================================================================
const PORT = process.env.PORT || CONFIG.PORT; // used to create, sign, and verify tokens
MONGOOSE.connect(CONFIG.DATABASE_URI); // connect to database
app.set('token', CONFIG.SECRET); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(BODY_PARSER.urlencoded({ extended: false }));
app.use(BODY_PARSER.json());

// use morgan to log requests to the console
app.use(MORGAN('dev'));

// =================================================================
// routes ==========================================================
// =================================================================
app.get('/setup', (req, res) => {

    // create a sample user
    let user = new USER_MODEL({
        name: CONFIG.USER.name,
        password: CONFIG.USER.password,
        admin: CONFIG.USER.is_admin
    });
    user.save((err) => {
        if (err) { throw err; }

        console.log('User saved successfully');
        res.json({ success: true });
    });
});

// basic route (http://localhost:8080)
app.get('/', function(req, res) {
    res.send('Hello! The API is at ' + CONFIG.HOST + ':' + PORT + '/api');
});

// ---------------------------------------------------------
// get an instance of the router for api routes
// ---------------------------------------------------------
let apiRoutes = EXPRESS.Router();

// ---------------------------------------------------------
// authentication (no middleware necessary since this isnt authenticated)
// ---------------------------------------------------------
// http://localhost:8080/api/authenticate
apiRoutes.post('/authenticate', (req, res) => {

    // find the user
    USER_MODEL.findOne({
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
                let token = JWT.sign(user, app.get('token'), {
                    expiresIn: 86400 // expires in 24 hours
                });

                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }

        }

    });
});

// ---------------------------------------------------------
// route middleware to authenticate and check token
// ---------------------------------------------------------
apiRoutes.use((req, res, next) => {

    // check header or url parameters or post parameters for token
    let token = req.body.token || req.param('token') || req.headers['x-access-token'];

    // decode token
    if (token) {

        // verifies secret and checks exp
        JWT.verify(token, app.get('token'), (err, decoded) => {
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

});

// ---------------------------------------------------------
// authenticated routes
// ---------------------------------------------------------
apiRoutes.get('/', (req, res) => {
    res.json({ message: 'Welcome to the coolest API on earth!' });
});

apiRoutes.get('/users', (req, res) => {
    USER_MODEL.find({}, (err, users) => {
        res.json(users);
    });
});

app.use('/api', apiRoutes);

// =================================================================
// start the server ================================================
// =================================================================
app.listen(PORT);
console.log(`Magic happens at ${CONFIG.host}:${PORT}`);