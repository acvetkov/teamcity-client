
import nock from 'nock';
import Changes from '../../src/changes';
import HttpClient from '../../src/utils/http-client';

const tcHost = 'teamcity.net';

describe('changes/index', function () {

    beforeEach(function () {
        const httpClient = new HttpClient({
            host: tcHost
        });
        this.changes = new Changes(httpClient);

        nock(`http://${tcHost}`)
            .get('/guestAuth/app/rest/changes/')
            .query({build: 'id:123'})
            .reply(200, {
                change: [
                    {id: 1},
                    {id: 2}
                ]
            })
            .get('/guestAuth/app/rest/changes/id:1')
            .reply(200, {id: 1, comment: 'abc'})
            .get('/guestAuth/app/rest/changes/id:2')
            .reply(200, {id: 2, comment: 'def'})
    });

    it('should load list without details', function () {
        return this.changes.list(123).then(changes => {
            assert.deepEqual(changes, {
                change: [
                    {id: 1},
                    {id: 2}
                ]
            });
        });
    });

    it('should load list with details', function () {
        return this.changes.list(123, {withDetails: true}).then(changes => {
            assert.deepEqual(changes, {
                change: [
                    {id: 1, comment: 'abc'},
                    {id: 2, comment: 'def'}
                ]
            });
        });
    });

    it('should load details', function () {
        return this.changes.detail(1).then(change => {
            assert.deepEqual(change, {id: 1, comment: 'abc'});
        });
    });

});
