"use strict";
/**
 * RPC Server - Sender and receiver.
 * RPC stands for Remote Procedure Call.
 * It's about sending a request to a server or another computer and waiting its response.
 *
 * Ex: To request a fibonacci number run the client
 * $ node ./rpc_client.js 30
 *
 * @author Nicolas GIGOU <nicolas.gigou [at] gmail.com>
 * @date 31/05/2017
 * @see https://www.rabbitmq.com/tutorials/tutorial-six-javascript.html
 */

// Use constants to mutualise
const CONSTANTS = require('../utils/constants');
console.log("\nConstants: " + JSON.stringify(CONSTANTS, null, 4) + "\n");

const util = require('../utils/uuid_generator');

const AMQP = require('amqplib/callback_api');

let args = process.argv.slice(2);

// Clean exit if no argument
if (args.length <= 0) {
    console.log("Usage: rpc_client.js num");
    process.exit(1);
}

AMQP.connect(CONSTANTS.CONNECT_TO, (err, connection) => {
    connection.createChannel((err, channel) => {

        channel.assertQueue('', { exclusive: true }, (err, q) => {
            let corr = util.generateUuid();
            let num = parseInt(args[0]);

            console.log(' [x] Requesting fib(%d)', num);

            channel.consume(q.queue, function(msg) {
                if (msg.properties.correlationId == corr) {
                    console.log(' [.] Got %s', msg.content.toString());
                    setTimeout(() => { connection.close(); process.exit(0); }, 500);
                }
            }, { noAck: true });

            channel.sendToQueue(CONSTANTS.RPC_QUEUE,
                new Buffer(num.toString()),
                { correlationId: corr, replyTo: q.queue });
        });
    });
});