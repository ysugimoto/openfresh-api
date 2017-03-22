'use strict';

const openfreshapi = require('../index.js');

openfreshapi.getToken('anonymous', 'anonymous')
.then(token => openfreshapi.getComments(token, {
  programId: 1000,
  sinceMillisecond: 300
}))
.then(comments => {
  console.log(comments);
  // do something
})
.catch(err => {
  console.error(err);
});
