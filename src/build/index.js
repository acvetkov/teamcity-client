/**
 * @author https://github.com/acvetkov
 * @overview
 */

import http from 'q-io/http';

import {buildDetailUrl, buildListUrl} from './url';
import {toJSON} from '../utils/index';

export default class Build {

    /**
     * @param {TeamcityApiOptions} options
     */
    constructor (options) {
        this.options = options;
    }

    /**
     * Get last build by query
     * @param {Object|String|Number} locator
     * @returns {Promise.<Object>|*}
     */
    detail (locator) {
        return http.read({
            url: buildDetailUrl(this.options, locator),
            headers: {
                Accept: 'application/json'
            }
        }).then(toJSON);
    }

    /**
     * Get build list by query
     * @param {Object|String|Number} locator
     * @returns {Promise.<Object>}
     */
    list (locator) {
        return http.read({
            url: buildListUrl(this.options, locator),
            headers: {
                Accept: 'application/json'
            }
        }).then(toJSON);
    }
}
