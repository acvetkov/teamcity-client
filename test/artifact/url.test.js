/**
 * @author https://github.com/acvetkov
 */

import {contentUrl, metaUrl, childrenUrl, archivedUrl} from '../../src/artifact/url';

const locator = {
    id: 'project-id'
};

describe('contentUrl', function () {
    it('should return contentUrl with artifact path', function () {
        assert.equal(
            contentUrl(locator, 'package.json'),
            'builds/id:project-id/artifacts/content/package.json'
        );

        assert.equal(
            contentUrl(locator, 'data/a/b/file.jpeg'),
            'builds/id:project-id/artifacts/content/data/a/b/file.jpeg'
        );
    });
});

describe('metaUrl', function () {
    it('should return metaUrl with artifact path', function () {
        assert.equal(
            metaUrl(locator, 'package.json'),
            'builds/id:project-id/artifacts/metadata/package.json'
        );

        assert.equal(
            metaUrl(locator, 'data/a/b/file.jpeg'),
            'builds/id:project-id/artifacts/metadata/data/a/b/file.jpeg'
        );
    });
});

describe('childrenUrl', function () {
    it('should return childrenUrl with artifact path', function () {
        assert.equal(
            childrenUrl(locator, 'path'),
            'builds/id:project-id/artifacts/children/path'
        );

        assert.equal(
            childrenUrl(locator, 'data/a/b'),
            'builds/id:project-id/artifacts/children/data/a/b'
        );
    });
});

describe('archivedUrl', function () {
    it('should return archivedUrl with artifact path', function () {
        assert.equal(
            archivedUrl(locator, 'path'),
            'builds/id:project-id/artifacts/archived/path'
        );
        assert.equal(
            archivedUrl(locator, 'data/a/b', '**/*.js'),
            'builds/id:project-id/artifacts/archived/data/a/b?locator=pattern:**/*.js'
        );
    });
});
