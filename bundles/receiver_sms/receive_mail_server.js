"use strict";
/**
 * Message consumer through SMS broker - Receiver.
 *
 * @author Nicolas GIGOU <nicolas.gigou [at] gmail.com>
 */

// Module to set up several modules at once time
const SYS = require('./utils/system');
const AMQP = require('amqplib/callback_api');

// Check if the constants exists to avoid crash when connecting to the AMQP client
if (!SYS.H.cioe(SYS.CONSTANTS)) { SYS.H.errHandler("while trying to read the constants. The config file might not be found", {}); }

AMQP.connect(SYS.CONSTANTS.CONNECT_TO, (err, connection) => {

    // Clean exit
    if(err) { SYS.H.errHandler("while trying to connect to the AMQP client", err); }

    // AMQP 0-9-1 connections are multiplexed with channels that can be thought
    // of as "lightweight connections that share a single TCP connection"
    connection.createChannel((err, channel) => {

        // Clean exit
        if(err) { SYS.H.errHandler("while trying to create the channel", err); }

        // Check the existence of the direct exchange
        // If the rabbitMQ is killed, the exchange is lost (durable: false)
        channel.assertExchange(SYS.CONSTANTS.EXCHANGE_NAME, SYS.CONSTANTS.EXCHANGE_TYPE, { durable: false });

        // Exclusive queues may only be accessed by the current connection
        // They are deleted when that connection closes
        channel.assertQueue(SYS.CONSTANTS.MAIL_QUEUE_NAME, { exclusive: true }, (err, q) => {

            // Clean exit
            if(err) { SYS.H.errHandler(`while trying to assert the ${SYS.CONSTANTS.MAIL_QUEUE_NAME} queue`, err); }

            console.log(` [*] Waiting for MAIL on ${SYS.CONSTANTS.MAIL_QUEUE_NAME} queue. To exit press CTRL+C`);

            // Bind the queue with the exchange by being interested by messages with the 'mail' pattern
            channel.bindQueue(q.queue, SYS.CONSTANTS.EXCHANGE_NAME, 'mail');

            // Executed action when receiving messages from the queue
            channel.consume(q.queue, (msg) => {
                console.log(` [x] ${msg.fields.routingKey}:${msg.content.toString()}`);
                console.log("The message with be send to the tiers MAIL broker right now");
            }, { noAck: false });
        });
    });
});