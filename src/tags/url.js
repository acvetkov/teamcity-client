/**
 * @author https://github.com/acvetkov
 * @overview Urls helper for teamcity tags
 */

import _ from 'lodash';
import {locatorToString} from '../utils/url';

/**
 * @param {Object} locatorObject
 * @returns {String}
 */
export function tagsUrl(locatorObject) {
    const locator = locatorToString(locatorObject);
    return `builds/${locator}/tags/`;
}

/**
 * Convert tag list to JSON object
 * @see https://confluence.jetbrains.com/display/TCD9/REST+API#RESTAPI-BuildTags
 * @param {Array<String>|String} tags
 * @returns {Object}
 */
export function tagsToObject(tags) {
    assertTagsArgument(tags);
    const arrTags = normalizeTags(tags);
    return arrTags.reduce((result, tag) => {
        result.tag.push({name: tag});
        return result;
    }, {count: arrTags.length, tag: []});
}

/**
 * Serialize tags to String
 * @see https://confluence.jetbrains.com/display/TCD9/REST+API#RESTAPI-BuildTags
 * @param {Array<String>|String} tags
 * @returns {String}
 */
export function serializeTags(tags) {
    return JSON.stringify(tagsToObject(tags));
}

/**
 * Assert tags arguments
 * @param {*} tags
 */
function assertTagsArgument(tags) {
    if (!_.isArray(tags) && !_.isString(tags)) {
        throw new Error(`tags must be array or string`);
    }
    if (_.isArray(tags)) {
        tags.forEach(tag => {
            if (!_.isString(tag)) {
                throw new Error(`single tag must be string`);
            }
        });
    }
}

/**
 * Convert tags to array
 * @param {String|Array<String>} tags
 * @returns {[]}
 */
function normalizeTags(tags) {
    if (_.isString(tags)) {
        return [tags];
    }
    return tags;
}
