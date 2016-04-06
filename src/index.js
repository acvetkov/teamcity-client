/**
 * @author https://github.com/acvetkov
 * @overview Teamcity api entry point
 */

import _ from 'lodash';

import HttpClient from './utils/http-client';
import Build from './build/index';
import Artifact from './artifact/index';
import Tags from './tags';
import Changes from './changes';

export default class TeamcityClient {

    /**
     * @param {TeamcityApiOptions} options
     */
    constructor (options) {
        this.assertOptions(options);
        this.options = _.defaults({}, options, {
            protocol: 'http://'
        });
        this.httpClient = new HttpClient(this.options);
        this.build = new Build(this.httpClient);
        this.artifact = new Artifact(this.httpClient);
        this.tags = new Tags(this.httpClient);
        this.changes = new Changes(this.httpClient);
    }

    /**
     * @param {TeamcityApiOptions} options
     */
    assertOptions (options) {
        if (!options || !_.isString(options.host)) {
            throw new TypeError('host is not specified');
        }
    }
}
