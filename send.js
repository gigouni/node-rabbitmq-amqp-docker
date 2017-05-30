"use strict";
/**
 * Message publisher - Sender.
 *
 * @author Nicolas GIGOU <nicolas.gigou [at] gmail.com>
 * @date 30/05/2017
 * @see https://www.rabbitmq.com/tutorials/tutorial-one-javascript.html
 */

// Use constants to mutualise
const CONSTANTS = require('./constants');
console.log("\nConstants: " + JSON.stringify(CONSTANTS, null, 4) + "\n");

// we need to require the library first
const AMQP = require('amqplib/callback_api');

// then connect to RabbitMQ server
AMQP.connect(CONSTANTS.CONNECT_TO, (err, conn) => {

    if(err){
        console.log("Err detected: " + err);
        process.exit(0);
    }

    console.log("Connected successfully!");
    console.log("Conn: " + conn);

    // Next we create a channel, which is where most of the API for getting things done resides:
    conn.createChannel((err, channel) => {
        let msg = 'Hello World!';

        channel.assertQueue(CONSTANTS.QUEUE_NAME, {durable: false});
        channel.sendToQueue(CONSTANTS.QUEUE_NAME, new Buffer(msg));
        console.log("Queue %s sent %s", CONSTANTS.QUEUE_NAME, msg);
    });

    setTimeout(() => { conn.close(); process.exit(0); }, 500);
});