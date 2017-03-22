'use strict';

const openfreshapi = require('../index.js');

openfreshapi.getToken('anonymous', 'anonymous')
.then(token => {
  console.log(token);
})
.catch(err => {
  console.error(err);
});
