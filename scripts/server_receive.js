"use strict";
/**
 * Message consumer - Receiver.
 *
 * @author Nicolas GIGOU <nicolas.gigou [at] gmail.com>
 * @date 30/05/2017
 * @see https://www.rabbitmq.com/tutorials/tutorial-one-javascript.html
 */

// Use constants to mutualise
const CONSTANTS = require('../utils/config');
const AMQP = require('amqplib/callback_api');

AMQP.connect(CONSTANTS.CONNECT_TO, (err, conn) => {
    conn.createChannel((err, ch) => {

        ch.assertQueue(CONSTANTS.QUEUE_NAME, { durable: false });
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", CONSTANTS.QUEUE_NAME);
        ch.consume(CONSTANTS.QUEUE_NAME, (msg) => {
            console.log(" [x] Received %s", msg.content.toString());
        }, {noAck: true});
    });
});