/**
 * @overview buildTypes urls helper
 */

import {locatorToString} from '../utils/url';

/**
 * Get detail buildType url
 * @param {Object|String|Number} locatorObject
 * @returns {String}
 */
export function buildTypeDetailUrl(locatorObject = {}) {
    const locator = locatorToString(locatorObject);
    return `buildTypes/${locator}`;
}

/**
 * Get list buildType url
 * @param {Object|String|Number} locatorObject
 * @returns {String}
 */
export function buildTypeListUrl(locatorObject = {}) {
    const locator = locatorToString(locatorObject);
    return `buildTypes/?locator=${locator}`;
}
