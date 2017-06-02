"use strict";
/**
 * Message consumer through SMS broker - Receiver.
 *
 * @author Nicolas GIGOU <nicolas.gigou [at] gmail.com>
 */

// Utility functions
const HELPER = require('../utils/helper');
const H = new HELPER();

// Use constants to mutualise
const CONSTANTS = require('../utils/config');
const AMQP = require('amqplib/callback_api');

AMQP.connect(CONSTANTS.CONNECT_TO, (err, connection) => {

    // Clean exit
    if(err) { H.errHandler("while trying to connect to the AMQP client", err); }

    // AMQP 0-9-1 connections are multiplexed with channels that can be thought
    // of as "lightweight connections that share a single TCP connection"
    connection.createChannel((err, channel) => {

        // Clean exit
        if(err) { H.errHandler("while trying to create the channel", err); }

        // Check the existence of the direct exchange
        // If the rabbitMQ is killed, the exchange is lost (durable: false)
        channel.assertExchange(CONSTANTS.EXCHANGE_NAME, 'direct', { durable: false });

        // Exclusive queues may only be accessed by the current connection
        // They are deleted when that connection closes
        channel.assertQueue(CONSTANTS.SMS_QUEUE_NAME, { exclusive: true }, (err, q) => {

            // Clean exit
            if(err) { H.errHandler(`while trying to assert the ${CONSTANTS.SMS_QUEUE_NAME} queue`, err); }

            console.log(` [*] Waiting for SMS on ${CONSTANTS.SMS_QUEUE_NAME} queue. To exit press CTRL+C`);

            // Bind the queue with the exchange by being interested by messages with the 'sms' pattern
            channel.bindQueue(q.queue, CONSTANTS.EXCHANGE_NAME, 'sms');

            // Executed action when receiving messages from the queue
            channel.consume(q.queue, (msg) => {
                console.log(" [x] %s: '%s'", msg.fields.routingKey, msg.content.toString());
                console.log("The message with be send to the tiers SMS broker right now");
            }, { noAck: false });
        });

        channel.assertQueue(CONSTANTS.MAIL_QUEUE_NAME, { exclusive: true }, (err, q) => {
            console.log(` [*] Waiting for MAIL on ${CONSTANTS.MAIL_QUEUE_NAME} queue. To exit press CTRL+C`);

            // Bind the queue with the exchange by being interested by messages with the 'mail' pattern
            channel.bindQueue(q.queue, CONSTANTS.EXCHANGE_NAME, 'mail');

            // Executed action when receiving messages from the queue
            channel.consume(q.queue, (msg) => {
                console.log(" [x] %s: '%s'", msg.fields.routingKey, msg.content.toString());
                console.log("The message with be send to the tiers MAIL broker right now");
            }, { noAck: false });
        });
    });
});