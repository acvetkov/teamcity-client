/**
 * @author https://github.com/acvetkov
 * @overview
 */

/**
 * @param {Blob} body
 * @returns {Object}
 */
export function toJSON(body) {
    return parseJSON(body.toString('utf-8'));
}

/**
 * @param {*} data
 * @param {*} [defaultValue]
 * @returns {*}
 */
export function parseJSON(data, defaultValue) {
    try {
        return JSON.parse(data);
    } catch (e) {
        return defaultValue || data;
    }
}
