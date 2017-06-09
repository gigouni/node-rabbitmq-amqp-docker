"use strict";
/**
 * send.js
 *
 * @description Route handler for sending messages to the MOM through the API.
 * @since 0.0.1.
 * @author Nicolas GIGOU.
 */

const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const SYS = require('../utils/system');
const AMQP = require('amqplib/callback_api');

ROUTER.post('/', function(req, res, err) {

    // if (err) { res.json(err); }

    let msg_req = req.body.msg;
    if (!msg_req) { res.json("No msg found in the POST request"); }

    if (!SYS.H.cioe(SYS.CONSTANTS)) { res.json("Error while trying to read the constants. The config file might not be found"); }

    console.log(`\n=== SEND_SERVER === will try to connect to ${SYS.CONSTANTS.CONNECT_TO}`);

    AMQP.connect(SYS.CONSTANTS.CONNECT_TO, (err, connection) => {

        console.log("Connected successfully!");

        // if (err) { res.json(err); }

        connection.createChannel((err, channel) => {

            // if (err) { res.json(err); }

            console.log("Channel created successfully!");

            // Use direct queue to be able to interpret the 2nd parameter of the channel.publish(...) function
            channel.assertExchange(SYS.CONSTANTS.EXCHANGE_NAME, SYS.CONSTANTS.EXCHANGE_TYPE, { durable: false });
            channel.publish(SYS.CONSTANTS.EXCHANGE_NAME, 'sms', new Buffer(msg_req));

            console.log("Publish action success!");

            console.log(` [x] Sent an SMS: '${msg_req}'`);
            res.json(`Success sending message`);
            console.log("CALL AFTER RES.JSON!");
        });

        setTimeout(() => {
            console.log("Time out. Close the connection.");
            connection.close();
        }, 500);
    });
});

module.exports = ROUTER;