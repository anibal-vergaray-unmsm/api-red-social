'use strict'

var mongoose=require('mongoose');
var Comment=require('../models/comment');

function saveComment(req, res) {
    var params = req.body;
    var comment = new Comment();

    if (params.textComment && params.userCommentId && params.postId) {
        comment.textComment = params.textComment;
        comment.userCommentId = params.userCommentId;
        comment.postId = params.postId;
        comment.created_at = new Date();

        comment.save(function(err, post){
            if(err){
                return res.status(500).json({ message: 'Error en la petición' });
            }
            return res.status(500).json(post);
        })
    }
    else{
        return res.status(500).json({ message: 'Error en la petición' });
    }

}

function getComments(req, res) {
    return Comment.find({}, function(err, posts){
        if (err) {
            return res.status(500).json({ message: 'Error en la petición' });
        }
        return res.json(posts);
    });
}

function getCommentById(req, res) {
    
    var commentId = req.params.id;
    
    return Comment.findById(commentId, function(err, comment){
        if (err) {
            return res.status(500).json({ message: 'Error en la petición' });
        }
        return res.json(comment);
    });
}

function getCommentsByPostId(req, res) {
    
    var postId = req.params.postId;
    return Comment.find({"postId": postId}, function(err, comments){
        if (err) {
            return res.status(500).json({ message: 'Error en la petición' });
        }
        return res.json(comments);
    });
}

module.exports = {
    saveComment,
    getComments,
    getCommentById,
    getCommentsByPostId,
}