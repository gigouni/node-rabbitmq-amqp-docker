/**
 * Fibonacci recursive function.
 *
 * @param n {number} The start of the decremental and recursive iteration.
 * @returns {*}
 * @public
 * @date 31/05/2017
 * @see https://www.rabbitmq.com/tutorials/tutorial-six-javascript.html
 */
let _fibonacci = function(n) {
    if (n === 0 || n === 1) {
        return n;
    }
    else
    {
        return _fibonacci(n - 1) + _fibonacci(n - 2);
    }
};

module.exports = {
    fibonacci: _fibonacci
};