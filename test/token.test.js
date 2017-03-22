'use strict';

const fs = require('fs');
const path = require('path');
const sinon = require('sinon');
const test = require('ava');
const token = require('../lib/token.js');
const request = require('../lib/request.js');

let auth;

test.before(async t => {
  const resp = JSON.parse(fs.readFileSync(path.join(__dirname, './fixtures/token.json')));
  sinon.stub(request, 'post').returns(Promise.resolve(resp));

  auth = await token.getToken('anonymous', 'anonymous');
});

test('authed token should be instanceof Token', t => {
  t.true(auth instanceof token.Token);
});

test('Dump and Parse should success', t => {
  const dump = auth.stringify();
  const parsed = token.parseToken(dump);

  t.is(auth.jwt, parsed.jwt);
});

test.after(() => {
  request.post.restore();
});

