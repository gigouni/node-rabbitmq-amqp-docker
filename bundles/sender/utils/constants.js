/**
 * --------------------------------------------------------------------------------------------------------------
 * Constants.
 *
 * @since 0.0.1.
 * @author Nicolas GIGOU.
 * @description A config file to mutualise all the constants into a single file. Improve the maintainability.
 *
 * *-*-*-*-*-*-*
 * How to use it
 * *-*-*-*-*-*-*
 *
 * <code>
 *      [...]
 *      const CONSTANTS = require('../utils/config');
 *      [...]
 *      console.log(`My constant: ${CONSTANTS.CONNECT_TO}`);
 * </code>
 * --------------------------------------------------------------------------------------------------------------
 */

// ------------------------------------------------------------------------------
//                  MOM ("Message-Oriented Middleware")
// ------------------------------------------------------------------------------
const _MOM_HOST = process.env.RABBIT_HOST || 'localhost';
const _MOM_PORT = 5672;
const _AMQP_PROTOCOL = 'amqp://';
const _MOM_CONNECT_TO = _AMQP_PROTOCOL + _MOM_HOST + ":" + _MOM_PORT;
const _SMS_QUEUE_NAME = 'sms_queue';
const _MAIL_QUEUE_NAME = 'mail_queue';
const _DIRECT_EXCHANGE_TYPE = 'direct';
const _DIRECT_EXCHANGE_NAME = 'direct_exchange';


// ------------------------------------------------------------------------------
//                                  API access
// ------------------------------------------------------------------------------
const _API_HOST = 'localhost';
const _API_PORT = 8080;
const _EXTERNAL_API_PORT = 8202;
const _API_SECRET = 'ilovescotchyscotch';
const _DATABASE_HOST = process.env.MONGO_HOST || 'localhost';
const _API_DATABASE = 'mongodb://' + _DATABASE_HOST + ':27017/database_name';
const _API_USER = {
    name: 'root',
    password: 'root',
    is_admin: true
};
const _API_TOKEN = "THE_SIGNED_TOKEN";


module.exports = {
    CONNECT_TO: _MOM_CONNECT_TO,
    SMS_QUEUE_NAME: _SMS_QUEUE_NAME,
    MAIL_QUEUE_NAME: _MAIL_QUEUE_NAME,
    EXCHANGE_TYPE: _DIRECT_EXCHANGE_TYPE,
    EXCHANGE_NAME: _DIRECT_EXCHANGE_NAME,


    API_HOST: _API_HOST,
    API_PORT: _API_PORT,
    EXTERNAL_API_PORT: _EXTERNAL_API_PORT,
    API_SECRET: _API_SECRET,
    API_DATABASE: _API_DATABASE,
    API_USER: _API_USER,
    API_TOKEN: _API_TOKEN
};