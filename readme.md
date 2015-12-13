## Teamcity Node.js client

```js
const teamcity = require('teamcity-client');

const api = new TeamcityApi({
    host: 'teamcity.domain.com',
    path: '/guestAuth/app/rest/'
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
