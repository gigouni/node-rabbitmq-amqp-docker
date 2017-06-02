"use strict";
/**
 * RPC Server - Receiver and sender.
 * RPC stands for Remote Procedure Call.
 * It's about receiving a request from a client or another computer and sending a response.
 *
 * The server code is rather straightforward.
 *      As usual we start by establishing the connection, channel and declaring the queue.
 *      We might want to run more than one server process.
 *      In order to spread the load equally over multiple servers we need to set the prefetch setting on channel.
 *      We use Channel.consume to consume messages from the queue.
 *      Then we enter the callback function where do the work and send the response back.
 *
 * Ex: Start the server
 * $ node ./rpc_server.js
 *
 * @author Nicolas GIGOU <nicolas.gigou [at] gmail.com>
 * @date 31/05/2017
 * @see https://www.rabbitmq.com/tutorials/tutorial-six-javascript.html
 */

// Use constants to mutualise
const CONSTANTS = require('../utils/constants');
console.log("\nConstants: " + JSON.stringify(CONSTANTS, null, 4) + "\n");

// Fibonacci function
const util = require('../utils/fibonacci');

const AMQP = require('amqplib/callback_api');

AMQP.connect(CONSTANTS.CONNECT_TO, (err, connection) => {
    connection.createChannel((err, channel) => {

        channel.assertQueue(CONSTANTS.RPC_QUEUE, { durable: false });
        channel.prefetch(1);
        console.log(' [x] Awaiting RPC requests');
        channel.consume(CONSTANTS.RPC_QUEUE, function reply(msg) {
            let number = parseInt(msg.content.toString());

            console.log(" [.] fib(%d)", number);

            let r = util.fibonacci(number);

            channel.sendToQueue(msg.properties.replyTo,
                new Buffer(r.toString()),
                { correlationId: msg.properties.correlationId });

            channel.ack(msg);
        });
    });
});