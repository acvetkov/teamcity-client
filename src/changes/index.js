/**
 * @overview Working with changes
 */

import {changesDetailUrl, changesListUrl} from './url';

export default class Changes {

    /**
     * @param {HttpClient} httpClient
     */
    constructor (httpClient) {
        this.httpClient = httpClient;
    }

    /**
     * Get change nfo
     * @param {String|Number} changeId
     * @returns {Promise.<Object>|*}
     */
    detail (changeId) {
        return this.httpClient.readJSON(changesDetailUrl(changeId));
    }

    /**
     * Get all changes for build
     * @param {String|Number} buildId
     * @param {Object} [options]
     * @param {Boolean} [options.withDetails]
     * @returns {Promise.<Object>}
     */
    list (buildId, options = {}) {
        let result = this.httpClient.readJSON(changesListUrl(buildId));
        if (options.withDetails) {
            result = result.then(changes => {
                if (!Array.isArray(changes.change)) {
                    return changes;
                }
                const tasks = changes.change.map(change => {
                    return this.detail(change.id).catch(() => change);
                });
                return Promise.all(tasks).then(detailedChanges => {
                    return {...changes, change: detailedChanges};
                });
            });
        }
        return result;
    }
}
