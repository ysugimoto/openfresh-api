'use strict';

const token = require('./token.js');
const comment = require('./comment.js');

module.exports = {
  getToken: token.getToken,
  getComments: comment.getComments,
  postComment: comment.postComment
};
