/**
 * @author https://github.com/acvetkov
 * @overview build urls helper
 */

import {locatorToString} from '../utils/url';

/**
 * Get url for changes list
 * @param {String|Number} buildId
 * @returns {String}
 */
export function changesListUrl(buildId) {
    const locator = locatorToString(buildId ? {id: buildId} : {});
    return `changes/?build=${locator}`;
}

/**
 * Get url for particular change
 * @param {String|Number} changeId
 * @returns {String}
 */
export function changesDetailUrl(changeId) {
    const locator = locatorToString(changeId ? {id: changeId} : {});
    return `changes/${locator}`;
}
