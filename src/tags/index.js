/**
 * @author https://github.com/acvetkov
 * @overview Work with build tags
 */

import http from 'q-io/http';

import {tagsUrl, serializeTags} from './url';
import {toJSON} from '../utils/index';

export default class BuildTags {

    /**
     * @param {TeamcityApiOptions} options
     */
    constructor (options) {
        this.options = options;
    }

    /**
     * Get tags for build
     * @param {Object} locator
     * @returns {Promise.<Object>}
     */
    get (locator) {
        return http.read({
            url: tagsUrl(this.options, locator),
            headers: {
                Accept: 'application/json'
            }
        }).then(toJSON);
    }

    /**
     * Add tags to specified build
     * @param {Object} locator
     * @param {String|Array<String>} tags
     * @returns {Promise.<Object>}
     */
    add (locator, tags) {
        return http.read({
            url: tagsUrl(this.options, locator),
            method: 'POST',
            body: [serializeTags(tags)],
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(toJSON);
    }

    /**
     * Replace tags of specified build
     * @param {Object} locator
     * @param {String|Array<String>} tags
     * @returns {Promise.<Object>}
     */
    replace (locator, tags) {
        return http.read({
            url: tagsUrl(this.options, locator),
            method: 'PUT',
            body: [serializeTags(tags)],
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(toJSON);
    }
}
