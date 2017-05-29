/**
 * Node.js back-end.
 * Uses the amqp10 npm's module to interact with ActiveMQ.
 *
 * @see https://github.com/noodlefrenzy/node-amqp10/issues/258
 */

const AMQP = require('amqp10');
const constants = require('./constants');
const AMQP_HOST = constants.HOST || 'localhost';

this.client = new AMQP.Client(AMQP.Policy.ActiveMQ);
this.client.connect(constants.AMQP_PROTOCOL + `${AMQP_HOST}`).then(() => {
    console.log('Connected', constants.AMQP_PROTOCOL + `${AMQP_HOST}`);
    this.client.createReceiver('log').then((receiver) => {
        console.log('Receiver created');
        receiver.on('message', (message) => {
            const level = message.level === 'warning' ? 'warn' : message.level;

            if (console[level] instanceof Function) {
                if (message.package) {
                    console[level](
                        (new Date(message.date).toISOString()),
                        message.package.name,
                        message.package.version,
                        message.level,
                        message.data
                    );
                } else {
                    console[level](
                        (new Date(message.date).toISOString()),
                        message.level,
                        message.data
                    );
                }
            }
        });
    }, (error) => {
        console.error(error);
        throw new Error('Unable to create a receiver for the amqp service, exiting');
    });
}, (error) => {
    console.error(error);
    throw new Error('Unable to connect to amqp service, exiting');
});

this.client.on('error', () => {
    console.error(error);
    throw new Error('Connection to amqp service is down, exiting');
});

this.client.on(AMQP.Client.ErrorReceived, error => console.error(error));

console.log('Test that we get here', constants.AMQP_PROTOCOL + `${AMQP_HOST}`);