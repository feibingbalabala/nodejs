const assert = require('assert');
const { add, mul } = require('../src/math');

describe('#math', () => {
    describe('add', () => {
        it ('should return 5 when 2 + 3', () => {
            assert.equal(add(2, 3), 5);
        });

        it ('should return -1 when 2 + -3', () => {
            assert.equal(add(2, -3), -1);
        });
    });

    describe('mul', () => {
        it ('should return 6 when 2 * 3', () => {
            assert.equal(mul(2, 3), 6);
        });
    });
});