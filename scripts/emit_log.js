"use strict";
/**
 * Logs producer - Sender.
 *
 * @author Nicolas GIGOU <nicolas.gigou [at] gmail.com>
 * @date 30/05/2017
 * @see https://www.rabbitmq.com/tutorials/tutorial-four-javascript.html
 */

// Use constants to mutualise
const CONSTANTS = require('../utils/constants');
console.log("\nConstants: " + JSON.stringify(CONSTANTS, null, 4) + "\n");

const AMQP = require('amqplib/callback_api');

AMQP.connect(CONSTANTS.CONNECT_TO, function(err, connection) {
    connection.createChannel(function(err, channel) {

        // Get the parameters as a log
        //
        // Example: emit_logs.js First attempt
        // Send "First attempt" in the queue
        //
        // Example: emit_logs.js
        // Send "Hello World!" in the queue
        let msg = process.argv.slice(2).join(' ') || 'Hello World!';

        // Declare named exchange with the fanout type - Pubsub way
        channel.assertExchange(CONSTANTS.EXCHANGE_NAME, 'fanout', {durable: false});
        channel.publish(CONSTANTS.EXCHANGE_NAME, '', new Buffer(msg));
        console.log(" [x] Sent %s", msg);
    });

    setTimeout(function() { connection.close(); process.exit(0); }, 500);
});