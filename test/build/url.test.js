/**
 * @author https://github.com/acvetkov
 */

import {buildDetailUrl, buildListUrl} from '../../src/build/url';

describe('buildDetailUrl', function () {

    it('should throw Error when locator is empty', function () {
        //NOTE: this because 'builds/' API return list, not details
        assert.throws(() => buildDetailUrl({}), Error);
        assert.throws(() => buildDetailUrl(), Error);
    });

    it('should return detail apiPath for build id', function () {
        assert.equal(buildDetailUrl({id: '1'}), 'builds/id:1');
    });

    it('should detail apiPath for build number', function () {
        assert.equal(buildDetailUrl({number: '390'}), 'builds/number:390');
    });

    it('should return detail apiPath with tags', function () {
        assert.equal(
            buildDetailUrl({tags: ['production', 'tested']}), 'builds/tags:(production,tested)'
        );
    });

    it('should return detail apiPath with buildType locator', function () {
        assert.equal(buildDetailUrl({buildType: {id: 'mega-project'}, tags: ['production', 'tested']}),
            'builds/buildType:(id:mega-project),tags:(production,tested)'
        );
    });

    it('should encode locator params', function () {
        assert.equal(buildDetailUrl({buildType: {id: 'mega-project'}, branch: 'my/mega/branch'}),
            'builds/buildType:(id:mega-project),branch:my%2Fmega%2Fbranch'
        );
    });

    it('should encode locator for nested params', function () {
        assert.equal(buildDetailUrl({buildType: {id: 'mega/project'}, branch: 'my/mega/branch'}),
            'builds/buildType:(id:mega%2Fproject),branch:my%2Fmega%2Fbranch'
        );
    });

    it('should encode locator for nested params', function () {
        assert.equal(buildDetailUrl({buildType: {id: 'mega/project'}, tags: ['tag/1', 'tag/2']}),
            'builds/buildType:(id:mega%2Fproject),tags:(tag%2F1,tag%2F2)'
        );
    });

    it('should return detail apiPath for build id with custom query arg', function () {
        assert.equal(buildDetailUrl({id: '1'}, {someQueryArg: 42}), 'builds/id:1?someQueryArg=42');
    });
});

describe('buildListUrl', function () {

    it('shouldnt return empty locator', function () {
        assert.equal(buildListUrl({}), 'builds/');
        assert.equal(buildListUrl(), 'builds/');
    });

    it('should return list apiPath for build id', function () {
        assert.equal(buildListUrl({buildType: {id: 'my-build-id'}}), 'builds/?locator=buildType:(id:my-build-id)');
    });

    it('should return list apiPath for build id with tags', function () {
        assert.equal(buildListUrl({buildType: {id: 'my-build-id'}, tags: ['production']}),
            'builds/?locator=buildType:(id:my-build-id),tags:(production)'
        );
    });

    it('should return list apiPath for build id limited by count in query args', function () {
        assert.equal(buildListUrl({buildType: {id: 'my-build-id'}}, {count: 42}), 'builds/?locator=buildType:(id:my-build-id)&count=42');
    });

    it('should return list apiPath limited by count in query args', function () {
        assert.equal(buildListUrl(undefined, {count: 42}), 'builds/?count=42');
    });
});
