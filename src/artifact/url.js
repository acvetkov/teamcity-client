/**
 * @author https://github.com/acvetkov
 * @overview
 */

import {apiUrl} from '../utils/url';
import {locatorToString} from '../utils/url';

/**
 * @param {TeamcityApiOptions} options
 * @param {Object} locator
 * @param {String} path
 * @returns {String}
 */
export function contentUrl(options, locator, path) {
    return `${apiUrl(options)}builds/${locatorToString(locator)}/artifacts/content/${path}`;
}

/**
 * @param {TeamcityApiOptions} options
 * @param {Object} locator
 * @param {String} path
 * @returns {String}
 */
export function metaUrl(options, locator, path) {
    return `${apiUrl(options)}builds/${locatorToString(locator)}/artifacts/metadata/${path}`;
}

/**
 * @param {TeamcityApiOptions} options
 * @param {Object} locator
 * @param {String} path
 * @returns {String}
 */
export function childrenUrl(options, locator, path) {
    return `${apiUrl(options)}builds/${locatorToString(locator)}/artifacts/children/${path}`;
}

/**
 * @param {TeamcityApiOptions} options
 * @param {Object} locator
 * @param {String} path
 * @param {String} [wildcard]
 * @returns {String}
 */
export function archivedUrl(options, locator, path, wildcard) {
    const url = `${apiUrl(options)}builds/${locatorToString(locator)}/artifacts/archived/${path}`;
    if (wildcard) {
        return `${url}?locator=pattern:${wildcard}`;
    }
    return url;
}
