/**
 * @author https://github.com/acvetkov
 * @overview artifact urls helper
 */

import {locatorToString} from '../utils/url';

/**
 * @param {Object} locatorObject
 * @param {String} path
 * @returns {String}
 */
export function contentUrl(locatorObject, path) {
    const locator = locatorToString(locatorObject);
    return `builds/${locator}/artifacts/content/${path}`;
}

/**
 * @param {Object} locatorObject
 * @param {String} path
 * @returns {String}
 */
export function metaUrl(locatorObject, path) {
    const locator = locatorToString(locatorObject);
    return `builds/${locator}/artifacts/metadata/${path}`;
}

/**
 * @param {Object} locatorObject
 * @param {String} path
 * @returns {String}
 */
export function childrenUrl(locatorObject, path) {
    const locator = locatorToString(locatorObject);
    return `builds/${locator}/artifacts/children/${path}`;
}

/**
 * @param {Object} locatorObject
 * @param {String} path
 * @param {String} [wildcard]
 * @returns {String}
 */
export function archivedUrl(locatorObject, path, wildcard) {
    const locator = locatorToString(locatorObject);
    const url = `builds/${locator}/artifacts/archived/${path}`;
    if (wildcard) {
        return `${url}?locator=pattern:${wildcard}`;
    }
    return url;
}
