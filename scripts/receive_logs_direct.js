"use strict";
/**
 * Logs consumer - Receiver.
 *
 * To save the logs in a file, run the following command:
 * $ ./receive_logs.js > logs_from_rabbit.log
 *
 * @author Nicolas GIGOU <nicolas.gigou [at] gmail.com>
 * @date 30/05/2017
 * @see https://www.rabbitmq.com/tutorials/tutorial-four-javascript.html
 */

// Use constants to mutualise
const CONSTANTS = require('../utils/constants');
console.log("\nConstants: " + JSON.stringify(CONSTANTS, null, 4) + "\n");

const AMQP = require('amqplib/callback_api');

let args = process.argv.slice(2);

// Clean exit if no args while running the script
if (args.length <= 0) {
    console.log("Usage: receive_logs_direct.js [info] [warning] [error]");
    process.exit(1);
}

AMQP.connect(CONSTANTS.CONNECT_TO, (err, connection) => {
    connection.createChannel((err, channel) => {

        // Check the existence of the direct exchange
        // If the rabbitMQ is killed, the exchange is lost (durable: false)
        channel.assertExchange(CONSTANTS.DIRECT_EXCHANGE_NAME, 'direct', { durable: false });

        // Exclusive queues may only be accessed by the current connection
        // They are deleted when that connection closes
        channel.assertQueue('', { exclusive: true }, (err, q) => {
            console.log(' [*] Waiting for logs. To exit press CTRL+C');

            // For each received messages, we're going to create a new binding for each severity we're interested in
            args.forEach((severity) => {
                channel.bindQueue(q.queue, CONSTANTS.DIRECT_EXCHANGE_NAME, severity);
            });

            // Executed action when receiving messages from the queue
            channel.consume(q.queue, (msg) => {
                console.log(" [x] %s: '%s'", msg.fields.routingKey, msg.content.toString());
            }, { noAck: true });
        });
    });
});