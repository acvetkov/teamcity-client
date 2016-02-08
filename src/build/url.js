/**
 * @author https://github.com/acvetkov
 * @overview build urls helper
 */

import {locatorToString} from '../utils/url';

/**
 * Get detail build url
 * @see https://confluence.jetbrains.com/display/TCD9/REST+API#RESTAPI-BuildLocator
 * @param {Object|String|Number} locatorObject
 * @returns {String}
 */
export function buildDetailUrl(locatorObject = {}) {
    const locator = locatorToString(locatorObject);
    return `builds/${locator}`;
}

/**
 * Get list build url
 * @see https://confluence.jetbrains.com/display/TCD9/REST+API#RESTAPI-BuildLocator
 * @param {Object|String|Number} locatorObject
 * @returns {String}
 */
export function buildListUrl(locatorObject = {}) {
    const locator = locatorToString(locatorObject);
    return `builds/?locator=${locator}`;
}
