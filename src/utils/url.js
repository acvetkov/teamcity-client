/**
 * @author https://github.com/acvetkov
 * @overview
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
