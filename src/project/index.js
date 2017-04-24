/**
 * @overview Get project info by criteria
 */

import {projectDetailUrl, projectListUrl} from './url';

export default class Project {

    /**
     * @param {HttpClient} httpClient
     */
    constructor (httpClient) {
        this.httpClient = httpClient;
    }

    /**
     * Get last project by query
     * @param {Object|String|Number} locator
     * @returns {Promise.<Object>|*}
     */
    detail (locator) {
        return this.httpClient.readJSON(projectDetailUrl(locator));
    }

    /**
     * Get project list by query
     * @param {Object|String|Number} locator
     * @returns {Promise.<Object>}
     */
    list (locator) {
        return this.httpClient.readJSON(projectListUrl(locator));
    }
}
