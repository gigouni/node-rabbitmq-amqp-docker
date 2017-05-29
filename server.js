"use strict";

let amqp = require('amqp');
let constants = require('./constants');

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

// add this for better debugging
connection.on('error', e => {
    console.log("Error from amqp: ", e);
});

// Wait for connection to become established.
connection.on('ready', () => {
    // Use the default 'amq.topic' exchange
    connection.queue(constants.QUEUE_NAME, q => {
        // Catch all messages
        q.bind('#');

        // Receive messages
        q.subscribe( message => {
            // Print messages to stdout
            console.log(message);
        });
    });
});
