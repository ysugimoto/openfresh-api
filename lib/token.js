'use strict';

const request = require('./request');

/**
 * Token wrapper
 */
class Token {
  /**
   * Constructor
   *
   * @param {String} token - JWT token
   * @param {String} expiredAt - Token exipires datetime
   */
  constructor(token, expiredAt) {
    this.jwt = token;
    this.expiredAt = expiredAt;
  }

  /**
   * Format to JSON string
   *
   * @return {String} - JSON string
   */
  stringify() {
    return JSON.stringify({
      token: this.jwt,
      expiredAt: this.expiredAt
    });
  }

  /**
   * checkContinueck token has expired
   *
   * @return {Boolean} - true if token has expired
   */
  isExpired() {
    return Date.now() > new Date(this.expiredAt).getTime();
  }

}

/**
 * Create token class instance from formatted JSON (Token::stringify())
 *
 * @param {String} tokenString - formatted token string
 * @return {Token} token -
 */
const parseToken = (tokenString) => {
  const parsed = JSON.parse(tokenString);
  return new Token(parsed.token, parsed.expiredAt);
};

/**
 * Request token
 *
 * @param {String} username - user name
 * @param {String} password - user password
 * @return {Promise} -
 */
const requestToken = (username, password) => {
  const body = {
    username: username,
    password: password
  };

  return request.post('/v1/oauth/token', body, {
    'Content-Type': 'application/json'
  })
  .then(response => {
    return new Token(
      response.data.token,
      response.data.expiredAt
    );
  });
};

module.exports = {
  Token: Token,
  getToken: requestToken,
  parseToken: parseToken
};
