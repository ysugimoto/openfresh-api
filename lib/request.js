'use strict';

const https = require('https');
const qs    = require('querystring');

const REQUEST_OPTIONS = {
  protocol: 'https:',
  hostname: 'openapi.freshlive.tv',
  port:     443,
  path:     '/',
  method:   'GET'
};

/**
 * Send GET request to API server
 *
 * @param {String} endpoint - request endpoint
 * @param {Object} query - querystring object
 * @param {Object} headers - request headers to append
 * @return {Promise} -
 */
const get = (endpoint, query = {}, headers = {}) => {
  const q = qs.stringify(query);
  const req = {
    path: `${endpoint}${q ? '?' + q : ''}`,
    headers: headers
  };

  return new Promise((resolve, reject) => {
    https.request(Object.assign({}, REQUEST_OPTIONS, req), (response) => {
      if (response.statusCode !== 200) {
        return reject(`${responce.statusCode}: HTTP request failed`);
      }

      let body = '';
      response.on('data', (chunk) => {
        body += chunk;
      });
      response.on('end', () => {
        resolve(JSON.parse(body));
      });
    })
    .on('error', (err) => reject(err));
  });
};

/**
 * Send POST request to API server
 *
 * @param {String} endpoint - request endpoint
 * @param {Object} body - request body object
 * @param {Object} headers - request headers to append
 * @return {Promise} -
 */
const post = (endpoint, body = {}, headers = {}) => {
  const req = {
    path: endpoint,
    method: 'POST',
    headers: headers
  };

  return new Promise((resolve, reject) => {
    const request = https.request(Object.assign({}, REQUEST_OPTIONS, req), (response) => {
      if (response.statusCode !== 200) {
        reject(`${response.statusCode}: HTTP request failed`);
        return;
      }

      let body = '';
      response.on('data', (chunk) => {
        body += chunk;
      });
      response.on('end', () => {
        resolve(JSON.parse(body));
      });
    });
    request.on('error', (err) => reject(err));
    request.write(qs.stringify(body));
    request.end();
  });
};

module.exports = {
  get: get,
  post: post
};
