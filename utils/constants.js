const _HOST             = 'localhost';
const _AMQP_PROTOCOL    = 'amqp://';
const _CONNECT_TO       = _AMQP_PROTOCOL + _HOST;
const _QUEUE_NAME       = 'hello';

module.exports = {
    HOST:               _HOST,
    AMQP_PROTOCOL:      _AMQP_PROTOCOL,
    CONNECT_TO:         _CONNECT_TO,
    QUEUE_NAME:         _QUEUE_NAME
};