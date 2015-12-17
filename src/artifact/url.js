/**
 * @author https://github.com/acvetkov
 * @overview artifact urls helper
 */

import {apiUrl} from '../utils/url';
import {locatorToString} from '../utils/url';

/**
 * @param {TeamcityApiOptions} options
 * @param {Object} locatorObject
 * @param {String} path
 * @returns {String}
 */
export function contentUrl(options, locatorObject, path) {
    const baseUrl = apiUrl(options);
    const locator = locatorToString(locatorObject);
    return `${baseUrl}builds/${locator}/artifacts/content/${path}`;
}

/**
 * @param {TeamcityApiOptions} options
 * @param {Object} locatorObject
 * @param {String} path
 * @returns {String}
 */
export function metaUrl(options, locatorObject, path) {
    const baseUrl = apiUrl(options);
    const locator = locatorToString(locatorObject);
    return `${baseUrl}builds/${locator}/artifacts/metadata/${path}`;
}

/**
 * @param {TeamcityApiOptions} options
 * @param {Object} locatorObject
 * @param {String} path
 * @returns {String}
 */
export function childrenUrl(options, locatorObject, path) {
    const baseUrl = apiUrl(options);
    const locator = locatorToString(locatorObject);
    return `${baseUrl}builds/${locator}/artifacts/children/${path}`;
}

/**
 * @param {TeamcityApiOptions} options
 * @param {Object} locatorObject
 * @param {String} path
 * @param {String} [wildcard]
 * @returns {String}
 */
export function archivedUrl(options, locatorObject, path, wildcard) {
    const baseUrl = apiUrl(options);
    const locator = locatorToString(locatorObject);
    const url = `${baseUrl}builds/${locator}/artifacts/archived/${path}`;
    if (wildcard) {
        return `${url}?locator=pattern:${wildcard}`;
    }
    return url;
}
