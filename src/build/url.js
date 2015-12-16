/**
 * @author https://github.com/acvetkov
 * @overview
 */

import {apiUrl} from '../utils/url';
import {locatorToString} from '../utils/url';

/**
 * Get detail build url
 * @see https://confluence.jetbrains.com/display/TCD9/REST+API#RESTAPI-BuildLocator
 * @param {TeamcityApiOptions} options
 * @param {Object|String|Number} locatorObject
 * @returns {String}
 */
export function buildDetailUrl(options, locatorObject = {}) {
    const baseUrl = apiUrl(options);
    const locator = locatorToString(locatorObject);
    return `${baseUrl}builds/${locator}`;
}

/**
 * Get list build url
 * @see https://confluence.jetbrains.com/display/TCD9/REST+API#RESTAPI-BuildLocator
 * @param {TeamcityApiOptions} options
 * @param {Object|String|Number} locatorObject
 * @returns {String}
 */
export function buildListUrl(options, locatorObject = {}) {
    const baseUrl = apiUrl(options);
    const locator = locatorToString(locatorObject);
    return `${baseUrl}builds/?locator=${locator}`;
}
