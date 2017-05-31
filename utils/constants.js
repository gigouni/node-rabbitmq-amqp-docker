const _HOST             = 'localhost';
const _AMQP_PROTOCOL    = 'amqp://';
const _CONNECT_TO       = _AMQP_PROTOCOL + _HOST;
const _QUEUE_NAME       = 'hello';
const _TASK_QUEUE_NAME  = 'task_queue';
const _DURABLE_QUEUE_NAME = 'durable_queue';
const _EXCHANGE_NAME    = 'logs';
const _DIRECT_EXCHANGE_NAME = 'direct_logs';
const _TOPIC_EXCHANGE_NAME = 'topic_logs';
const _RPC_QUEUE        = 'rpc_queue';

module.exports = {
    HOST:               _HOST,
    AMQP_PROTOCOL:      _AMQP_PROTOCOL,
    CONNECT_TO:         _CONNECT_TO,
    QUEUE_NAME:         _QUEUE_NAME,
    TASK_QUEUE_NAME:    _TASK_QUEUE_NAME,
    DURABLE_QUEUE_NAME: _DURABLE_QUEUE_NAME,
    EXCHANGE_NAME:      _EXCHANGE_NAME,
    DIRECT_EXCHANGE_NAME: _DIRECT_EXCHANGE_NAME,
    TOPIC_EXCHANGE_NAME: _TOPIC_EXCHANGE_NAME,
    RPC_QUEUE:          _RPC_QUEUE
};