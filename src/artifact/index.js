/**
 * @author https://github.com/acvetkov
 * @overview
 */

import http from 'q-io/http';

import {contentUrl, metaUrl, childrenUrl, archivedUrl} from './url';
import {toJSON} from '../utils/index';

export default class Artifact {

    /**
     * @param {TeamcityApiOptions} options
     */
    constructor (options) {
        this.options = options;
    }

    /**
     * Download artifact content
     * @param locator
     * @param {String} path
     * @returns {Promise<Stream>}
     */
    content (locator, path) {
        return http.read({
            url: contentUrl(this.options, locator, path)
        });
    }

    /**
     * Get artifact meta info
     * @param {Object} locator
     * @param {String} path
     * @returns {Promise<Object>}
     */
    meta (locator, path) {
        return http.read({
            url: metaUrl(this.options, locator, path),
            headers: {
                Accept: 'application/json'
            }
        }).then(toJSON);
    }

    /**
     * List of artifact children for directories and archives
     * @param {Object} locator
     * @param {String} path
     * @returns {Promise<Object>}
     */
    children (locator, path) {
        return http.read({
            url: childrenUrl(this.options, locator, path),
            headers: {
                Accept: 'application/json'
            }
        }).then(toJSON);
    }

    /**
     *
     * @param {Object} locator
     * @param {String} path
     * @param {String} [wildcard]
     * @returns {Promise<Stream>}
     */
    archived (locator, path, wildcard) {
        return http.read({
            url: archivedUrl(this.options, locator, path, wildcard)
        });
    }
}
