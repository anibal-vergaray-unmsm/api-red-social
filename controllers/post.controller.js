'use strict'

var mongoose=require('mongoose');

var Post=require('../models/post');

function savePost(req, res) {
    var params = req.body;
    var post = new Post();
    console.log(params);
    if (params.user_id && params.text) {
        post.user_id = params.user_id;
        post.text = params.text;
        post.created_at = new Date();

        post.save(function(err, post){
            if(err){
                return res.status(500).json({ message: 'Error en la petición' });
            }
            return res.json(post);
        })
    }
    else{
        return res.status(500).json({ message: 'Error en la petición' });
    }
}

function getPosts(req, res) {
    return Post.find({}, function(err, posts){
        if (err) {
            return res.status(500).json({ message: 'Error en la petición' });
        }
        return res.json(posts);
    });
}

function getPostByUserId(req, res) {
    
    var userId = req.params.userId;
    return Post.find({"user_id": userId}, function(err, posts){
        if (err) {
            return res.status(500).json({ message: 'Error en la petición' });
        }
        return res.json(posts);
    });
}

module.exports = {
    savePost,
    getPosts,
    getPostByUserId
}