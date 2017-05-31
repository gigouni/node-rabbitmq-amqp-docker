"use strict";
/**
 * Logs producer - Sender.
 *
 * Redirects the message to a specific queue, depending on a defined pattern.
 * Uses topic queues to be able to use pattern like '*' or '#' in routing keys.
 *
 * In pattern, like '*.orange.*', '*.*.rabbit' or 'lazy.#',
 * '*' joker is used to replace one word.
 * '#' joker is used ot replace zero or more words.
 *
 * Ex: Emit a log with a routing key "kern.critical" type
 * $ node ./emit_log_topic.js "kern.critical" "A critical kernel error"
 *
 * @author Nicolas GIGOU <nicolas.gigou [at] gmail.com>
 * @date 30/05/2017
 * @see https://www.rabbitmq.com/tutorials/tutorial-five-javascript.html
 */

// Use constants to mutualise
const CONSTANTS = require('../utils/constants');
console.log("\nConstants: " + JSON.stringify(CONSTANTS, null, 4) + "\n");

const AMQP = require('amqplib/callback_api');

AMQP.connect(CONSTANTS.CONNECT_TO, (err, connection) => {
    connection.createChannel((err, channel) => {

        let args = process.argv.slice(2);
        let key = (args.length > 0) ? args[0] : 'anonymous.info';
        let msg = args.slice(1).join(' ') || 'Hello World!';

        // Use direct queue to be able to interpret the 2nd parameter of the channel.publish(...) function
        channel.assertExchange(CONSTANTS.TOPIC_EXCHANGE_NAME, 'topic', { durable: false });
        channel.publish(CONSTANTS.TOPIC_EXCHANGE_NAME, key, new Buffer(msg));
        console.log(" [x] Sent %s: '%s'", key, msg);
    });

    setTimeout(() => { connection.close(); process.exit(0); }, 500);
});