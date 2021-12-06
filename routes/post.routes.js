'use strict'

var express = require('express');
var { savePost, getPosts, getPostByUserId, likePost } = require('../controllers/post.controller');
var api = express.Router(); 

var baseEndpoint = '/posts';

// get
api.get(baseEndpoint, getPosts);
api.get(baseEndpoint + '/user/:userId', getPostByUserId);

// post
api.post(baseEndpoint, savePost);
api.post(baseEndpoint + '/like/:postId', likePost);

// put
// delete

module.exports = api;