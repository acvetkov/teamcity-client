/**
 * @author https://github.com/acvetkov
 */

import {changesDetailUrl, changesListUrl} from '../../src/changes/url';

describe('changes/url', function () {

    describe('changesListUrl', function () {

        it('should return empty locator', function () {
            assert.equal(changesListUrl(), 'changes/?build=');
        });

        it('should return list apiPath for build id', function () {
            assert.equal(changesListUrl('my-build-id'), 'changes/?build=id:my-build-id');
        });
    });

    describe('changesDetailUrl', function () {

        it('should return apiPath without locator', function () {
            assert.equal(changesDetailUrl(), 'changes/');
        });

        it('should return detail apiPath for id', function () {
            assert.equal(changesDetailUrl('1'), 'changes/id:1');
        });

    });

});
