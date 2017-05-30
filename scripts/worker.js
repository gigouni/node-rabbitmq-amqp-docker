"use strict";
/**
 * Message consumer through Work queue - Worker.
 *
 * @author Nicolas GIGOU <nicolas.gigou [at] gmail.com>
 * @date 30/05/2017
 * @see https://www.rabbitmq.com/tutorials/tutorial-one-javascript.html
 */

// Use constants to mutualise
const CONSTANTS = require('../utils/constants');
console.log("\nConstants: " + JSON.stringify(CONSTANTS, null, 4) + "\n");

const AMQP = require('amqplib/callback_api');

AMQP.connect(CONSTANTS.CONNECT_TO, (err, conn) => {
    conn.createChannel((err, channel) => {

        channel.assertQueue(CONSTANTS.QUEUE_NAME, { durable: false });
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", CONSTANTS.QUEUE_NAME);

        // Let's fake it by just pretending we're busy - by using the setTimeout method.
        // We'll take the number of dots in the string as its complexity; every dot will account for one second of "work"
        channel.consume(CONSTANTS.TASK_QUEUE_NAME, (msg) => {
            let secs = msg.content.toString().split('.').length - 1;

            console.log(" [x] Received %s", msg.content.toString());
            setTimeout(function() {
                console.log(" [x] Done");
            }, secs * 1000);
        }, { noAck: true });

    });
});