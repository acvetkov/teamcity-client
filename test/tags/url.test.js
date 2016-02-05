/**
 * @author https://github.com/acvetkov
 */

import {tagsUrl, tagsToObject} from '../../src/tags/url';

const options = {
    protocol: 'http://',
    host: 'teamcity.net',
    path: '/guestAuth/app/rest/'
};

const locator = {
    id: 'project-id'
};

describe('tagsUrl', function () {
    it('should return correct url', function () {
        assert.equal(
            tagsUrl(options, locator),
            'http://teamcity.net/guestAuth/app/rest/builds/id:project-id/tags/'
        );
    });
});

describe('tagsToObject', function () {

    it('should throw error for non-array of strings or non-string argument', function () {
        function a() {
            tagsToObject();
        }

        function b() {
            tagsToObject(true);
        }

        function c() {
            tagsToObject({});
        }

        function d() {
            tagsToObject(1, 2, 3);
        }

        function e() {
            tagsToObject([1, 2, 3]);
        }

        assert.throws(a, 'tags must be array or string');
        assert.throws(b, 'tags must be array or string');
        assert.throws(c, 'tags must be array or string');
        assert.throws(d, 'tags must be array or string');
        assert.throws(e, 'single tag must be string');
    });

    it('should create valid tags object for empty list', function () {
        assert.deepEqual(tagsToObject([]), {
            count: 0,
            tag: []
        });
    });

    it('should create valid tags object for single tag', function () {
        assert.deepEqual(tagsToObject('single_tag'), {
            count: 1,
            tag: [{name: 'single_tag'}]
        });
    });

    it('should create valid tags object for tag list', function () {
        assert.deepEqual(tagsToObject(['first_tag', 'second_tag', 'third_tag']), {
            count: 3,
            tag: [
                {name: 'first_tag'},
                {name: 'second_tag'},
                {name: 'third_tag'}
            ]
        });
    });
});
