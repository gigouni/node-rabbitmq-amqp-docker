"use strict";

let amqp = require('amqp');
let constants = require('./config');

let connection = amqp.createConnection(
    {
        host:           constants.HOST,
        port:           constants.PORT,
        login:          constants.LOGIN,
        password:       constants.PASSWORD,
        connectionTimeout: constants.CONNECTION_TIMEOUT,
        authMechanism:  constants.AUTH_MECHANISM,
        vhost:          constants.V_HOST,
        noDelay:        constants.NO_DELAY,
        ssl:            constants.SSL
});

// add this for better debuging
connection.on('error', function(e) {
    console.log("Error from amqp: ", e);
});

// Wait for connection to become established.
connection.on('ready', function () {
    // Use the default 'amq.topic' exchange
    connection.queue(constants.QUEUE_NAME, function (q) {
        // Catch all messages
        q.bind('#');

        // Receive messages
        q.subscribe(function (message) {
            // Print messages to stdout
            console.log(message);
        });
    });
});
