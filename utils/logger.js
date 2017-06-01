"use strict";
/**
 * ---------------------------------------------------------------------------------------------------------
 * Logger system.
 * Dependency of the 'winston' npm's module.
 * Logs message in a specific file.
 *
 * Instantiates with the __PROTOTYPE__ pattern.
 *
 * @since 0.0.1.
 * @description A logs manager to help during the development process.
 * @see https://logmatic.io/blog/efficient-json-logging-with-nodejs/
 * ---------------------------------------------------------------------------------------------------------
 */

// Module dependencies
const WINSTON = require('winston');
const HELPER = require('./helper');
const H = new HELPER();

function Logger() {
    let current_time = H.getCurrentTime();
    console.log(current_time);
    this.logger = new (WINSTON.Logger)({
        transports: [
            new (WINSTON.transports.File)({
                name: 'info-file',
                filename: 'logs/file-log-info-' + current_time + '.log',
                level: 'info'
            })
        ]
    });
    console.log(`A new logger has been instantiated with the name logs/file-log-info-${current_time} .log'.`);
}

Logger.prototype.log = (severity, message) => {
    this.logger.log(severity, message);
};

Logger.prototype.info = (message, obj) => {
    this.logger.log(message, obj);
};

Logger.prototype.warn = (message) => {
    this.logger.warn(message);
};

Logger.prototype.error = (message) => {
    this.logger.error(message);
};

module.exports = Logger;