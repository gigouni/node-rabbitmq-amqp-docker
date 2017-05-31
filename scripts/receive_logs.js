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

AMQP.connect(CONSTANTS.CONNECT_TO, (err, connection) => {
    connection.createChannel((err, channel) => {

        channel.assertExchange(CONSTANTS.EXCHANGE_NAME, 'fanout', { durable: false });

        channel.assertQueue('', { exclusive: true }, (err, q) => {
            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
            channel.bindQueue(q.queue, CONSTANTS.EXCHANGE_NAME, '');

            channel.consume(q.queue, (msg) => {
                console.log(" [x] %s", msg.content.toString());
            }, { noAck: true });
        });
    });
});