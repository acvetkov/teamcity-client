/**
 * @overview projects urls helper
 */

import {locatorToString} from '../utils/url';

/**
 * Get detail project url
 * @param {Object|String|Number} locatorObject
 * @returns {String}
 */
export function projectDetailUrl(locatorObject = {}) {
    const locator = locatorToString(locatorObject);
    return `projects/${locator}`;
}

/**
 * Get list project url
 * @param {Object|String|Number} locatorObject
 * @returns {String}
 */
export function projectListUrl(locatorObject = {}) {
    const locator = locatorToString(locatorObject);
    return `projects/?locator=${locator}`;
}
