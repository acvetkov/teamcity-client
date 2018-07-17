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
 * @throws {Error} Argument locatorObject must not be empty
 */
export function buildDetailUrl(locatorObject = {}) {
    const locator = locatorToString(locatorObject);
    if (!locator) {
        throw new Error('Please fill locatorObject');
    }
    return `builds/${locator}`;
}

/**
 * Get list build url
 * @see https://confluence.jetbrains.com/display/TCD9/REST+API#RESTAPI-BuildLocator
 * @param {Object|String|Number|undefined} locatorObject
 * @returns {String}
 */
export function buildListUrl(locatorObject = {}) {
    let rv = 'builds/' ;
    const locator = locatorToString(locatorObject);
    if (locator) {
        rv += `?locator=${locator}`;
    }
    return rv;
}
