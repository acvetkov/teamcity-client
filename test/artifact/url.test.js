/**
 * @author https://github.com/acvetkov
 * @overview
 */

import {contentUrl, metaUrl, childrenUrl, archivedUrl} from '../../src/artifact/url';

const options = {
    protocol: 'http://',
    host: 'teamcity.net',
    path: '/guestAuth/app/rest/'
};

const locator = {
    id: 'project-id'
};

describe('contentUrl', function () {
    it('should return contentUrl with artifact path', function () {
        assert.equal(
            contentUrl(options, locator, 'package.json'),
            'http://teamcity.net/guestAuth/app/rest/builds/id:project-id/artifacts/content/package.json'
        );

        assert.equal(
            contentUrl(options, locator, 'data/a/b/file.jpeg'),
            'http://teamcity.net/guestAuth/app/rest/builds/id:project-id/artifacts/content/data/a/b/file.jpeg'
        );
    });
});

describe('metaUrl', function () {
    it('should return metaUrl with artifact path', function () {
        assert.equal(
            metaUrl(options, locator, 'package.json'),
            'http://teamcity.net/guestAuth/app/rest/builds/id:project-id/artifacts/metadata/package.json'
        );

        assert.equal(
            metaUrl(options, locator, 'data/a/b/file.jpeg'),
            'http://teamcity.net/guestAuth/app/rest/builds/id:project-id/artifacts/metadata/data/a/b/file.jpeg'
        );
    });
});

describe('childrenUrl', function () {
    it('should return childrenUrl with artifact path', function () {
        assert.equal(
            childrenUrl(options, locator, 'path'),
            'http://teamcity.net/guestAuth/app/rest/builds/id:project-id/artifacts/children/path'
        );

        assert.equal(
            childrenUrl(options, locator, 'data/a/b'),
            'http://teamcity.net/guestAuth/app/rest/builds/id:project-id/artifacts/children/data/a/b'
        );
    });
});

describe('metaUrl', function () {
    // jscs: disable
    it('should return archivedUrl with artifact path', function () {
        assert.equal(
            archivedUrl(options, locator, 'path'),
            'http://teamcity.net/guestAuth/app/rest/builds/id:project-id/artifacts/archived/path'
        );
        assert.equal(
            archivedUrl(options, locator, 'data/a/b', '**/*.js'),
            'http://teamcity.net/guestAuth/app/rest/builds/id:project-id/artifacts/archived/data/a/b?locator=pattern:**/*.js'
        );
    });
});
