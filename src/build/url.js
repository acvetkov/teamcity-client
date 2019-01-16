/**
 * @author https://github.com/acvetkov
 * @overview build urls helper
 */

import {locatorToString, serializeParams} from '../utils/url';

/**
 * Get detail build url
 * @see https://confluence.jetbrains.com/display/TCD9/REST+API#RESTAPI-BuildLocator
 * @param {Object|String|Number} locatorObject
 * @param {Object} args API http query arguments
 * @returns {String}
 * @throws {Error} Argument locatorObject must not be empty
 */
export function buildDetailUrl(locatorObject = {}, args = undefined) {
    const locator = locatorToString(locatorObject);
    if (!locator) {
        throw new Error('Please fill locatorObject');
    }

    let rv = `builds/${locator}`;
    if (args) {
        const args_s = serializeParams(args);
        rv += `?${args_s}`;
    }
    return rv;
}

/**
 * Get list build url
 * @see https://confluence.jetbrains.com/display/TCD9/REST+API#RESTAPI-BuildLocator
 * @param {Object|String|Number|undefined} locatorObject
 * @param {Object} args API http query arguments
 * @returns {String}
 */
export function buildListUrl(locatorObject = {}, args = undefined) {
    let rv = 'builds/' ;
    const locator = locatorToString(locatorObject);
    if (locator) {
        rv += `?locator=${locator}`;
    }
    if (args) {
        const args_s = serializeParams(args);
        rv += locator ? '&' : '?';
        rv += args_s;
    }
    return rv;
}
