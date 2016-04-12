[![Build Status](https://travis-ci.org/acvetkov/teamcity-client.svg?branch=master)](https://travis-ci.org/acvetkov/teamcity-client)

## Teamcity Node.js client

```js
const teamcity = require('teamcity-client');

const api = new TeamcityClient({
    host: 'teamcity.domain.com',
    user: 'username', // optional
    password: 'pwd' // optional
});
```

### builds

Get detail info about build

```js
const options = {
    tags: ['production', 'tested'],
    user: 'username'
};

// get last build by criteria
teamcity.build.detail(options)
   .then(buildInfo => console.log(buildInfo))
   .catch(err => console.error(err));

// get build by id
teamcity.build.detail({id: 'my-build-id'})
   .then(buildInfo => console.log(buildInfo))
   .catch(err => console.error(err));
   
// get build by number
teamcity.build.detail({number: '537'})
   .then(buildInfo => console.log(buildInfo))
   .catch(err => console.error(err));   
```

Get list of builds by criteria

```js
teamcity.build.list({buildType: {id: 'project-id'}})
   .then(buildList => console.log(buildList))
   
teamcity.build.list({buildType: {id: 'project-id'}, tags: ['production']})
   .then(buildList => console.log(buildList))   
```

You can use all [build locator](https://confluence.jetbrains.com/display/TCD9/REST+API#RESTAPI-BuildLocator) params to get build 

### artifacts

**Download source**

```js
const fs = require('q-io/fs');

api.artifact.content(options, 'relative/path/to/source')
   .then(blob => fs.write('data.zip', blob))
```

**Get metadata**

```js
api.artifact.meta(options, 'source.json')
   .then(data => console.log(data));
```

Response example

```json
{
  "name": "source.json",
  "size": 25360,
  "modificationTime": "20151202T183212+0300",
  "href": "/guestAuth/app/rest/builds/id:10/artifacts/metadata/source.json",
  "content": {
    "href": "/guestAuth/app/rest/builds/id:10/artifacts/content/source.json"
  }
}
```

**Get children list**

```js
api.artifact.children(options, 'relative/path')
   .then(data => console.log(JSON.stringify(data, null, 2)))
```

Response example

```json
{
  "count": 1,
  "file": [
    {
      "name": "pathA",
      "modificationTime": "2T183246+0300",
      "href": "/guestAuth/app/rest/builds/id:4869415/artifacts/metadata/relative/path/pathA",
      "children": {
        "href": "/guestAuth/app/rest/builds/id:4869415/artifacts/children/relative/path/pathA"
      }
    },
  ]
}
```

**Download archived sources**

Download zip with all js-files in directory `relative/path`

```js
api.artifact.archived(options, 'relative/path', '**/*.js')
   .then(blob => fs.write('data.zip', blob))
```

### tags

**Get tags**

```js
api.tags.get(locator)
   .then(data => console.log(data))
```

**Add tags**

```js
api.tags.add(locator, ['tag1', 'tag2'])
   .then(data => console.log(data))
   
api.tags.add(locator, 'new_tag')
   .then(data => console.log(data))   
```

**Replace tags**

```js
api.tags.replace(locator, ['tag1', 'tag2'])
   .then(data => console.log(data))
   
api.tags.add(locator, 'new_tag')
   .then(data => console.log(data))   
```

### changes

**Get changes list**

```js
api.changes.list(buildId)
   .then(data => console.log(data))
```

**Get changes list with details**

```js
api.changes.list(buildId, {withDetails: true})
   .then(data => console.log(data))
```

**Get particular change details**

```js
api.changes.detail(changeId)
   .then(data => console.log(data))
```
