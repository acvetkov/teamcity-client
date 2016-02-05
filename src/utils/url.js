/**
 * @author https://github.com/acvetkov
 * @overview urls helper
 */

import _ from 'lodash';

/**
 * Api url
 * @param {TeamcityApiOptions} options
 * @returns {*}
 */
export function apiUrl(options) {
    return `${options.protocol}${options.host}${options.path}`;
}

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
        return data;
    }
    const options = _.map(data, (value, key) => {
        if (_.isArray(value)) {
            return `${key}:(${value.join()})`;
        }
        if (_.isPlainObject(value)) {
            return `${key}:(${locatorToString(value)})`;
        }
        return `${key}:${value}`;
    });
    return _.compact(options).join();
}

/**
 * Get query string
 * @param {Object} data
 * @returns {String}
 */
export function serializeParams(data) {
    return _.map(data, (val, key) => `${key}=${val}`).join('&');
}
