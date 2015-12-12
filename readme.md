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

teamcity.build.detail(options)
   .then(buildInfo => console.log(buildInfo))
   .catch(err => console.error(err));
```

