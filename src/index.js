/**
 * @author https://github.com/acvetkov
 * @overview Teamcity api entry point
 */

import _ from 'lodash';

import Build from './build/index';
import Artifact from './artifact/index';

export default class TeamcityClient {

    /**
     * @param {TeamcityApiOptions} options
     */
    constructor (options) {
        this.assertOptions(options);
        this.options = _.defaults({}, options, {
            path: '/guestAuth/app/rest/',
            protocol: 'http://'
        });
        this.build = new Build(this.options);
        this.artifact = new Artifact(this.options);
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
