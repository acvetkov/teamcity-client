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
 * @param {Object|String|Number} locator
 * @returns {String}
 */
export function buildDetailUrl(options, locator = {}) {
    return `${apiUrl(options)}builds/${locatorToString(locator)}`;
}

/**
 * Get list build url
 * @see https://confluence.jetbrains.com/display/TCD9/REST+API#RESTAPI-BuildLocator
 * @param {TeamcityApiOptions} options
 * @param {Object|String|Number} locator
 * @returns {String}
 */
export function buildListUrl(options, locator = {}) {
    return `${apiUrl(options)}builds/?locator=${locatorToString(locator)}`;
}
