/**
 * UUID Generator.
 *
 * @returns {string} The generated UUID
 * @public
 * @date 31/05/2017
 * @see https://www.rabbitmq.com/tutorials/tutorial-six-javascript.html
 */
let _generateUuid = function() {
    return Math.random().toString() +
        Math.random().toString() +
        Math.random().toString();
};

module.exports = {
    generateUuid: _generateUuid
};