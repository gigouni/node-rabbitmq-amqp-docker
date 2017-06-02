"use strict";
/**
 * Message publisher - Sender.
 *
 * @author Nicolas GIGOU <nicolas.gigou [at] gmail.com>
 * @date 30/05/2017
 * @see https://www.rabbitmq.com/tutorials/tutorial-one-javascript.html
 */

// Utility functions
const HELPER = require('../utils/helper');
const H = new HELPER();

// Use constants to mutualise
const CONSTANTS = require('../utils/config');
const AMQP = require('amqplib/callback_api');

// Check if the constants exists to avoid crash when connecting to the AMQP client
if (!H.cioe(CONSTANTS)) { H.errHandler("while trying to read the constants. The config file might not be found", {}); }

AMQP.connect(CONSTANTS.CONNECT_TO, (err, connection) => {

    // Clean exit
    if(err) { H.errHandler("while trying to connect to the AMQP client", err); }

    connection.createChannel((err, channel) => {

        // Clean exit
        if(err) { H.errHandler("while trying to create the channel", err); }

        let target = 'sms';
        let msg = 'Test d\'envoi de message pour les SMS';

        // Use direct queue to be able to interpret the 2nd parameter of the channel.publish(...) function
        channel.assertExchange(CONSTANTS.EXCHANGE_NAME, 'direct', { durable: false });
        channel.publish(CONSTANTS.EXCHANGE_NAME, target, new Buffer(msg));
        console.log(` [x] Sent ${target}: '${msg}'`);
    });

    setTimeout(() => {
        console.log("Time out. Close the connection.");
        connection.close();
        process.exit(0);
    }, 500);
});