/**
 * @author https://github.com/acvetkov
 * @overview urls helper
 */

import _ from 'lodash';

/**
 * Convert object to String
 * object {a: 'b', c: 'd'} => (a:b,c:d)
 * array [1, 2, 3] => (1,2,3)
 * complicated structure {a: [1,2], b:1, c:{a:1, b:2}} => a:(1,2),b:1,c:(a:1,b:2)
 * @param {*} data
 * @returns {String}
 */
export function locatorToString(data) {
    if (!_.isPlainObject(data)) {
        return encodeURIComponent(data);
    }
    const options = _.map(data, (value, key) => {
        if (_.isArray(value)) {
            return `${key}:(${value.map(encodeURIComponent).join()})`;
        }
        if (_.isPlainObject(value)) {
            return `${key}:(${locatorToString(value)})`;
        }
        return `${key}:${encodeURIComponent(value)}`;
    });
    return _.compact(options).join();
}

/**
 * Get query string
 * @param {Object} data
 * @returns {String}
 */
export function serializeParams(data) {
    return _.map(data, (val, key) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`).join('&');
}
