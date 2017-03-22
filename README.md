# openfresh-api
[unofficial] openfresh API client

**This is example use only**

## Usage

```js
const openfreshapi = require('./index.js');

openfreshapi.getToken('username', 'password')
.then(token => openfreshapi.getComments(token, {
  programId: 1000,
  sinceMilliSecond: 156000
})
.then(comments => {
  console.log(comments);
});
```

## License

MIT
