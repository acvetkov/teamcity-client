/**
 * @overview Get buildType info by criteria
 */

import {buildTypeDetailUrl, buildTypeListUrl} from './url';

export default class BuildType {

    /**
     * @param {HttpClient} httpClient
     */
    constructor (httpClient) {
        this.httpClient = httpClient;
    }

    /**
     * Get last buildType by query
     * @param {Object|String|Number} locator
     * @returns {Promise.<Object>|*}
     */
    detail (locator) {
        return this.httpClient.readJSON(buildTypeDetailUrl(locator));
    }

    /**
     * Get buildType list by query
     * @param {Object|String|Number} locator
     * @returns {Promise.<Object>}
     */
    list (locator) {
        return this.httpClient.readJSON(buildTypeListUrl(locator));
    }
}
