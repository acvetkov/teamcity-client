/**
 * @author https://github.com/acvetkov
 * @overview Api request helper.
 * Proxy http requests, call api methods as guest user if auth info is not passed,
 * call api methods with basic authentication, if auth data passed
 */

import _ from 'lodash';
import http from 'q-io/http';
import {toJSON} from './index';

const GUEST_USER = 'guestAuth';
const HTTP_USER = 'httpAuth';

export default class HttpClient {

    /**
     * @param {TeamcityApiOptions} options
     */
    constructor (options) {
        assertOptions(options);
        this.options = options;
    }

    /**
     * Http request
     * @param {String} apiPath
     * @param {String} method
     * @param {Object} headers
     * @returns {Promise<Buffer>}
     */
    read (apiPath, method = 'GET', headers = {}) {
        return http.read({
            url: `${this.apiUrl}${apiPath}`,
            method: method,
            headers: _.merge({}, headers, this.authHeader)
        });
    }

    /**
     * Read json http response
     * @param {String} apiPath
     * @param {String} [method]
     * @param {Object} [headers]
     * @returns {Promise<Object>}
     */
    readJSON (apiPath, method, headers) {
        return this.read(apiPath, method, _.merge(this.jsonHeader, headers || {}))
            .then(toJSON);
    }

    /**
     * Send json-data
     * @param {String} apiPath
     * @param {*} body
     * @param {String} method
     * @param {Object} [headers]
     */
    sendJSON (apiPath, body, method = 'POST', headers = {}) {
        return http.read({
            url: `${this.apiUrl}${apiPath}`,
            method: method,
            body: body,
            headers: _.merge({'Content-Type': 'application/json'}, headers, this.authHeader, this.jsonHeader)
        }).then(toJSON);
    }

    /**
     * Get common headers for all api calls
     * @returns {*}
     */
    get authHeader () {
        if (this.httpAccess) {
            return {
                Authorization: this.auth
            };
        }
        return {};
    }

    /**
     * @returns {{Accept: string}}
     */
    get jsonHeader () {
        return {
            Accept: 'application/json'
        };
    }

    /**
     * Api url
     * @returns {String}
     */
    get apiUrl () {
        return `${this.options.protocol}${this.options.host}/${this.accessType}/app/rest/`;
    }

    /**
     * Is authorized user
     * @returns {boolean}
     */
    get httpAccess () {
        return _.isString(this.options.user) && _.isString(this.options.password);
    }

    /**
     * guest user or authorized
     * @returns {*}
     */
    get accessType () {
        if (this.httpAccess) {
            return HTTP_USER;
        }
        return GUEST_USER;
    }

    /**
     * Get auth hash
     * @returns {*}
     */
    get auth () {
        return toBase64(`${this.options.user}:${this.options.password}`);
    }
}

/**
 * @param {TeamcityApiOptions} options
 */
function assertOptions(options) {
    if (_.isString(options.user) && !_.isString(options.password)) {
        throw new Error('Incorrect password type');
    }
    if (!_.isString(options.user) && _.isString(options.password)) {
        throw new Error('Incorrect user type');
    }
}

/**
 * Get base64 hash
 * @param {String} str
 * @returns {String}
 */
function toBase64(str) {
    return new Buffer(str).toString('base64');
}
