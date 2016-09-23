/**
 * @author https://github.com/acvetkov
 * @overview Api request helper.
 * Proxy http requests, call api methods as guest user if auth info is not passed,
 * call api methods with basic authentication, if auth data passed
 */

import _ from 'lodash';
import createDebug from 'debug';
import http from 'q-io/http';
import {toJSON} from './index';

const GUEST_USER = 'guestAuth';
const HTTP_USER = 'httpAuth';
const debug = createDebug('teamcity-client');

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
     * @param {Object} addHeaders
     * @returns {Promise<Buffer>}
     */
    read (apiPath, method = 'GET', addHeaders = {}) {
        const url = `${this.apiUrl}${apiPath}`;
        const headers = _.assign({}, addHeaders, this.authHeader);
        debug(`${method} ${url}`);
        debug(`headers: ${JSON.stringify(headers)}`);
        return http.read({
            url,
            method,
            headers
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
        return this.read(apiPath, method, _.assign(this.jsonHeader, headers || {}))
            .then(toJSON);
    }

    /**
     * Send json-data
     * @param {String} apiPath
     * @param {*} body
     * @param {String} method
     * @param {Object} [addHeaders]
     */
    sendJSON (apiPath, body, method = 'POST', addHeaders = {}) {
        const url = `${this.apiUrl}${apiPath}`;
        const headers = _.assign({'Content-Type': 'application/json'}, addHeaders, this.authHeader, this.jsonHeader);
        return http.read({
            url,
            method,
            body,
            headers
        }).then(toJSON);
    }

    /**
     * Get common headers for all api calls
     * @returns {*}
     */
    get authHeader () {
        if (this.httpAccess) {
            return {
                Authorization: `Basic ${this.auth}`
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
    if (!options.protocol) {
        options.protocol = 'http://';
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
