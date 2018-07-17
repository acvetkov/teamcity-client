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
     * @param {Object} args API http query arguments
     * @returns {Promise.<Object>|*}
     */
    detail (locator, args) {
        return this.httpClient.readJSON(buildDetailUrl(locator, args));
    }

    /**
     * Get build list by query
     * @param {Object|String|Number} locator
     * @param {Object} args API http query arguments
     * @returns {Promise.<Object>}
     */
    list (locator, args) {
        return this.httpClient.readJSON(buildListUrl(locator, args));
    }
}
