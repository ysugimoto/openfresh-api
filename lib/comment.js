'use strict';

const request = require('./request.js');
const Token = require('./token.js').Token;

const GET_COMMENT_DEFAULTS = {
  programId:        0,
  limit:            20,
  sinceMillisecond: 0,
  order:           'asc'
};

const POST_COMMENT_DEFAULTS = {
  programId: 0,
  comment:   ''
};

/**
 * Validate parameter fields
 *
 * @param {Object} data Request parameters
 * @param {Array} requiredFields validate to required fields
 * @throws {Error} -
 * @return {Void} -
 */
const validateParams = (data, requiredFields) => {
  Object.keys(data).forEach(key => {
    if (!requiredFields.includes(key)) {
      throw new Error(`Unexprected request field exists: ${key}`);
    }
    const truely = Boolean(data[key]);
    if (!truely) {
      throw new Error(`Field: ${key} is required and not empty or above 0.`);
    }
  });
};

/**
 * Get comments
 *
 * @param {Token} token - access token
 * @param {Object} params - request params
 * @return {Promise} -
 */
const getComments = (token, params = {}) => {
  if (!(token instanceof Token)) {
    throw new Error('token must be instanceof Token');
  }
  const q = Object.assign({}, GET_COMMENT_DEFAULTS, params);
  validateParams(q, ['programId', 'sinceMillisecond']);
  return request.get('/v1/comments', q, {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token.jwt}`
  });
};

/**
 * Post comment
 *
 * @param {Token} token - access token
 * @param {Object} body - request body
 * @return {Promise} -
 */
const postComment = (token, body = {}) => {
  if (!(token instanceof Token)) {
    throw new Error('token must be instanceof Token');
  }
  const q = Object.assign({}, POST_COMMENT_DEFAULTS, params);
  validateParams(q, ['programId', 'comment']);
  return request.post('/v1/comments', body, {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token.jwt}`
  });
};

module.exports = {
  getComments: getComments,
  postComment: postComment
};
