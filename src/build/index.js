/**
 * @author https://github.com/acvetkov
 * @see https://confluence.jetbrains.com/display/TCD9/REST+API#RESTAPI-BuildLocator
 * @overview Get build info by criteria
 */

import {buildDetailUrl, buildListUrl} from './url';

export default class Build {

    /**
     * @param {HttpClient} httpClient
     */
    constructor (httpClient) {
        this.httpClient = httpClient;
    }

    /**
     * Get last build by query
     * @param {Object|String|Number} locator
     * @returns {Promise.<Object>|*}
     */
    detail (locator) {
        return this.httpClient.readJSON(buildDetailUrl(locator));
    }

    /**
     * Get build list by query
     * @param {Object|String|Number} locator
     * @returns {Promise.<Object>}
     */
    list (locator) {
        return this.httpClient.readJSON(buildListUrl(locator));
    }
}
