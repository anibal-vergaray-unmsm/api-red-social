'use strict'

var express = require('express');

const { saveComment, getComments, getCommentById, getCommentsByPostId,} = require('../controllers/comment.controlller');

var api = express.Router(); 
var baseEndpoint = '/comments';

// get
api.get(baseEndpoint, getComments);
api.get(baseEndpoint + '/:id', getCommentById);
api.get(baseEndpoint + '/postId/:postId', getCommentsByPostId);

// post
api.post(baseEndpoint,saveComment);

//put
//delete

module.exports = api;