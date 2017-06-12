"use strict";
/**
 * receive.js
 *
 * @description Route handler for receiving messages from the MOM through the API.
 * @since 0.0.1.
 * @author Nicolas GIGOU.
 */

const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const SYS = require('../utils/system');
const AMQP = require('amqplib/callback_api');

ROUTER.get('/', function(req, res, err) {

    // if (err) { res.json(err); }

    console.log(`=== RECEIVE_SMS_SERVER === will try to connect to ${SYS.CONSTANTS.CONNECT_TO}`);

    AMQP.connect(SYS.CONSTANTS.CONNECT_TO, (err, connection) => {

        console.log("Connected successfully!");

        // Clean exit
        // if (err) { res.json(err); }

        // AMQP 0-9-1 connections are multiplexed with channels that can be thought
        // of as "lightweight connections that share a single TCP connection"
        connection.createChannel((err, channel) => {

            // Clean exit
            // if (err) { res.json(err); }

            // Check the existence of the direct exchange
            // If the rabbitMQ is killed, the exchange is lost (durable: false)
            channel.assertExchange(SYS.CONSTANTS.EXCHANGE_NAME, SYS.CONSTANTS.EXCHANGE_TYPE, { durable: false });

            // Exclusive queues may only be accessed by the current connection
            // They are deleted when that connection closes
            channel.assertQueue(SYS.CONSTANTS.SMS_QUEUE_NAME, { exclusive: true }, (err, q) => {

                // Clean exit
                // if (err) { res.json(err); }

                console.log(` [*] Waiting for SMS on ${SYS.CONSTANTS.SMS_QUEUE_NAME} queue. To exit press CTRL+C`);

                // Bind the queue with the exchange by being interested by messages with the 'sms' pattern
                channel.bindQueue(q.queue, SYS.CONSTANTS.EXCHANGE_NAME, 'sms');

                // Executed action when receiving messages from the queue
                channel.consume(q.queue, (msg) => {
                    console.log(` [x] ${msg.fields.routingKey}:${msg.content.toString()}`);
                    console.log("The message with be send to the tiers SMS broker right now");
                    res.json(`Success receiving message: ${msg.content.toString()}`);
                }, { noAck: false });
            });
        });
    });
});

module.exports = ROUTER;