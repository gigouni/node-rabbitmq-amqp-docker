"use strict";
/**
 * Message publisher - Sender.
 *
 * @author Nicolas GIGOU <nicolas.gigou [at] gmail.com>
 * @date 30/05/2017
 * @see https://www.rabbitmq.com/tutorials/tutorial-one-javascript.html
 */

// Use constants to mutualise
const CONSTANTS = require('../utils/config');
const AMQP = require('amqplib/callback_api');

if (Object.keys(CONSTANTS).length <= 0) {
    console.error("No config file found. Process exit.");
    process.exit(0);
}

AMQP.connect(CONSTANTS.CONNECT_TO, (err, connection) => {

    // Clean exit
    if(err){
        console.error("Error while trying to connect detected: " + err);
        process.exit(0);
    }

    console.log("Connected successfully!");

    connection.createChannel((err, channel) => {

        // Clean exit
        if(err){
            console.error("Error while trying to create a channel detected: " + err);
            process.exit(0);
        }

        let args = process.argv.slice(2);
        let msg = args.slice(1).join(' ') || 'Hello World!';
        let severity = (args.length > 0) ? args[0] : 'info';

        // Use direct queue to be able to interpret the 2nd parameter of the channel.publish(...) function
        channel.assertExchange(CONSTANTS.DIRECT_EXCHANGE_NAME, 'direct', { durable: false });
        channel.publish(CONSTANTS.DIRECT_EXCHANGE_NAME, severity, new Buffer(msg));
        console.log(" [x] Sent %s: '%s'", severity, msg);
    });

    setTimeout(() => {
        console.log("Time out. Close the connection.");
        connection.close();
        process.exit(0);
    }, 1000);
});