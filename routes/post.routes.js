'use strict'

var express = require('express');
var { savePost, getPosts, getPostByUserId } = require('../controllers/post.controller');
var api = express.Router(); 

var baseEndpoint = '/posts';

// get
api.get(baseEndpoint, getPosts);
api.get(baseEndpoint + '/user/:userId', getPostByUserId);

// post
api.post(baseEndpoint, savePost);

// put
// delete

module.exports = api;