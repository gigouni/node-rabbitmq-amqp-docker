"use strict";
/**
 * Logs producer - Sender.
 *
 * Redirects the message to a specific queue, depending on the message severity.
 * Uses direct queues because fanout queues don't care about the 2nd parameter of the channel.publish(...) function.
 *
 * @author Nicolas GIGOU <nicolas.gigou [at] gmail.com>
 * @date 30/05/2017
 * @see https://www.rabbitmq.com/tutorials/tutorial-four-javascript.html
 */

// Use constants to mutualise
const CONSTANTS = require('../utils/constants');
console.log("\nConstants: " + JSON.stringify(CONSTANTS, null, 4) + "\n");

const AMQP = require('amqplib/callback_api');

AMQP.connect(CONSTANTS.CONNECT_TO, (err, connection) => {
    connection.createChannel((err, channel) => {

        let args = process.argv.slice(2);
        let msg = args.slice(1).join(' ') || 'Hello World!';
        let severity = (args.length > 0) ? args[0] : 'info';

        // Use direct queue to be able to interpret the 2nd parameter of the channel.publish(...) function
        channel.assertExchange(CONSTANTS.DIRECT_EXCHANGE_NAME, 'direct', { durable: false });
        channel.publish(CONSTANTS.DIRECT_EXCHANGE_NAME, severity, new Buffer(msg));
        console.log(" [x] Sent %s: '%s'", severity, msg);
    });

    setTimeout(() => { connection.close(); process.exit(0); }, 500);
});