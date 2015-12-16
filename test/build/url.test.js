/**
 * @author https://github.com/acvetkov
 */

import {buildDetailUrl, buildListUrl} from '../../src/build/url';

const options = {
    protocol: 'http://',
    host: 'teamcity.net',
    path: '/guestAuth/app/rest/'
};

describe('buildDetailUrl', function () {

    it('should return url without locator', function () {
        assert.equal(buildDetailUrl(options, {}), 'http://teamcity.net/guestAuth/app/rest/builds/');
        assert.equal(buildDetailUrl(options), 'http://teamcity.net/guestAuth/app/rest/builds/');
    });

    it('should return detail url for build id', function () {
        assert.equal(buildDetailUrl(options, {id: '1'}), 'http://teamcity.net/guestAuth/app/rest/builds/id:1');
    });

    it('should detail url for build number', function () {
        assert.equal(
            buildDetailUrl(options, {number: '390'}),
            'http://teamcity.net/guestAuth/app/rest/builds/number:390'
        );
    });

    it('should return detail url with tags', function () {
        assert.equal(
            buildDetailUrl(options, {tags: ['production', 'tested']}),
            'http://teamcity.net/guestAuth/app/rest/builds/tags:(production,tested)'
        );
    });

    it('should return detail url with buildType locator', function () {
        assert.equal(
            buildDetailUrl(options, {
                buildType: {id: 'mega-project'},
                tags: ['production', 'tested']
            }),
            'http://teamcity.net/guestAuth/app/rest/builds/buildType:(id:mega-project),tags:(production,tested)'
        );
    });
});

describe('buildListUrl', function () {

    it('should return empty locator', function () {
        assert.equal(buildListUrl(options, {}), 'http://teamcity.net/guestAuth/app/rest/builds/?locator=');
        assert.equal(buildListUrl(options), 'http://teamcity.net/guestAuth/app/rest/builds/?locator=');
    });

    it('should return list url for build id', function () {
        assert.equal(
            buildListUrl(options, {buildType: {id: 'my-build-id'}}),
            'http://teamcity.net/guestAuth/app/rest/builds/?locator=buildType:(id:my-build-id)'
        );
    });

    it('should return list url for build id with tags', function () {
        assert.equal(
            buildListUrl(options, {buildType: {id: 'my-build-id'}, tags: ['production']}),
            'http://teamcity.net/guestAuth/app/rest/builds/?locator=buildType:(id:my-build-id),tags:(production)'
        );
    });
});
