"use strict";
/**
 * ---------------------------------------------------------------------------------------------------------
 * Helper Class.
 *
 * @since 0.0.1.
 * @author Nicolas GIGOU.
 * @description A custom NodeJS module to optimize the development process by providing helper functions.
 * ---------------------------------------------------------------------------------------------------------
 */

/**
 * @constructor
 * @description Constructs a new Helper instance.
 * @returns {Helper} A small module to avoid long typings. Some kind of lazyness in action.
 * @since 0.0.1.
 * @author Nicolas GIGOU.
 */
function Helper() {}

/**
 * @description Returns the current time according to the format hh:mm:ss.
 * @returns {string} The current time.
 * @since 0.0.1.
 * @author Nicolas GIGOU.
 */
Helper.prototype.getCurrentTime = () => {
    let current_date = new Date();
    let hour = current_date.getHours();
    let minute = current_date.getMinutes();
    let second = current_date.getSeconds();

    // Add zeros before number to avoid things like 10h5 instead of 10h05.
    if (hour < 10) { hour = "0" + hour; }
    if (minute < 10) { minute = "0" + minute; }
    if (second < 10) { second = "0" + second; }

    return hour + ":" + minute + ":" + second;
};

/**
 * @description Checks if the object exists by checking the number of elements inside it.
 * @param obj {object} The object to check.
 * @since  0.0.1.
 * @author Nicolas GIGOU.
 */
Helper.prototype.cioe = (obj) => {
    return (Object.keys(obj).length > 0);
};

/**
 * @description Handles the err when catching some from the MOM.
 * @param msg {string} The message to add to the error log.
 * @param err {object} The object containing the error data.
 * @since  0.0.1.
 * @author Nicolas GIGOU.
 */
Helper.prototype.errHandler = (msg, err) => {
    if(msg === "") {
        msg = "caught by anonymous call";
    }
    console.log(`Err ${msg}: `, err);
    process.exit(0);
};

module.exports = Helper;