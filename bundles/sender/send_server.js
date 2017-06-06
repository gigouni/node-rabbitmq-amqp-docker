"use strict";
/**
 * Message publisher - Sender.
 *
 * @author Nicolas GIGOU <nicolas.gigou [at] gmail.com>
 * @date 30/05/2017
 * @see https://www.rabbitmq.com/tutorials/tutorial-one-javascript.html
 */

// Module to set up several modules at once time
const SYS = require('./utils/system');
const AMQP = require('amqplib/callback_api');

// Check if the constants exists to avoid crash when connecting to the AMQP client
if (!SYS.H.cioe(SYS.CONSTANTS)) { SYS.H.errHandler("while trying to read the constants. The config file might not be found", {}); }

console.log(`=== SEND_SERVER === will try to connect to ${SYS.CONSTANTS.CONNECT_TO}`);

AMQP.connect(SYS.CONSTANTS.CONNECT_TO, (err, connection) => {

    // Clean exit
    if(err) { SYS.H.errHandler("while trying to connect to the AMQP client", err); }

    connection.createChannel((err, channel) => {

        // Clean exit
        if(err) { SYS.H.errHandler("while trying to create the channel", err); }

        let target = 'sms';
        let msg = 'Test d\'envoi de message pour les SMS';

        // Use direct queue to be able to interpret the 2nd parameter of the channel.publish(...) function
        channel.assertExchange(SYS.CONSTANTS.EXCHANGE_NAME, SYS.CONSTANTS.EXCHANGE_TYPE, { durable: false });
        channel.publish(SYS.CONSTANTS.EXCHANGE_NAME, target, new Buffer(msg));
        console.log(` [x] Sent ${target}: '${msg}'`);
    });

    setTimeout(() => {
        console.log("Time out. Close the connection.");
        connection.close();
        process.exit(0);
    }, 500);
});