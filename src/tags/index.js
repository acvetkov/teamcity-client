/**
 * @author https://github.com/acvetkov
 * @overview Work with build tags
 */

import {tagsUrl, serializeTags} from './url';

export default class BuildTags {

    /**
     * @param {HttpClient} httpClient
     */
    constructor (httpClient) {
        this.httpClient = httpClient;
    }

    /**
     * Get tags for build
     * @param {Object} locator
     * @returns {Promise.<Object>}
     */
    get (locator) {
        return this.httpClient.readJSON(tagsUrl(locator));
    }

    /**
     * Add tags to specified build
     * @param {Object} locator
     * @param {String|Array<String>} tags
     * @returns {Promise.<Object>}
     */
    add (locator, tags) {
        return this.httpClient.sendJSON(tagsUrl(locator), [serializeTags(tags)]);
    }

    /**
     * Replace tags of specified build
     * @param {Object} locator
     * @param {String|Array<String>} tags
     * @returns {Promise.<Object>}
     */
    replace (locator, tags) {
        return this.httpClient.sendJSON(tagsUrl(locator), [serializeTags(tags)], 'PUT');
    }
}
