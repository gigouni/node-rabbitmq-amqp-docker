/**
 * ---------------------------------------------------------------------------------------------------------
 * System module.
 *
 * @description A module to import several utils like the Helper or the Logger at once time.
 * @since 0.0.1.
 * @author Nicolas GIGOU.
 *
 * *-*-*-*
 * Warning
 * *-*-*-*
 *
 * Even if this code is called several times, Node.js won't instantiate several
 * instance of the Helper or the Logger. They will be automatically cached and retrieve it when needed.
 *
 * *-*-*-*-*-*-*
 * How to use it
 * *-*-*-*-*-*-*
 *
 * <code>
 *      const SYS = require('../utils/system');
 *
 *      let a_constant  = SYS.CONSTANTS.CONNECT_TO;
 *      if(...) { SYS.H.errHandler(msg, err); }
 *      if(...) { SYS.L.log(msg); }
 * </code>
 * ---------------------------------------------------------------------------------------------------------
 */

// The lib of helpful functions
const HELPER = require('../utils/helper');
const _H = new HELPER();

// The config/constants to mutualise all the important and editable data into a single file
const _CONSTANTS = require('./constants');

module.exports = {
    H:          _H,
    CONSTANTS:  _CONSTANTS
};