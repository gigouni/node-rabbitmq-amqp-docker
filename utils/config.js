const _HOST                 = 'localhost';
const _AMQP_PROTOCOL        = 'amqp://';
const _CONNECT_TO           = _AMQP_PROTOCOL + _HOST;
const _SMS_QUEUE_NAME       = 'sms_queue';
const _MAIL_QUEUE_NAME      = 'mail_queue';
const _DIRECT_EXCHANGE_NAME = 'direct_exchange';

module.exports = {
    CONNECT_TO:             _CONNECT_TO,
    SMS_QUEUE_NAME:         _SMS_QUEUE_NAME,
    MAIL_QUEUE_NAME:        _MAIL_QUEUE_NAME,
    EXCHANGE_NAME:          _DIRECT_EXCHANGE_NAME
};