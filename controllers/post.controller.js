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
        return res.status(500).json({ message: 'Campos incompletos' });
    }
}

function getPosts(req, res) {
    return Post.aggregate([
        { $lookup:{from: 'users',localField: 'user_id',foreignField: '_id',as: 'user' }},
        { $unwind:"$user" }, 
        { $lookup:{
            from: 'comments',localField: '_id',foreignField: 'postId',
            pipeline: [{$lookup:{from: 'users',localField: 'userCommentId',foreignField: '_id',as: 'user' }},{ $unwind:"$user" }],
            as: 'comments' }
        },
        {$sort:{ created_at : -1 }},
        {$project: {
            _id: 1, text : 1, created_at : 1, user : 1,comments:1,
            numberOfLikes: { $cond: { if: { $isArray: "$likes" }, then: { $size: "$likes" }, else: 0} }
        }}
        ], 
        function(err, posts){
        if (err) {
            return res.status(500).json({ message: 'Error en la petición' });
        }
        return res.json(posts);
    });
}

function getPostByUserId(req, res) {
    
    const userId = req.params.userId;
    return Post.aggregate([
        { $match: {
            user_id: mongoose.Types.ObjectId(userId)
        }},
        { $lookup:{
            from: 'comments',localField: '_id',foreignField: 'postId',
            pipeline: [{$lookup:{from: 'users',localField: 'userCommentId',foreignField: '_id',as: 'user' }},{ $unwind:"$user" }],
            as: 'comments' }
        },
        {$sort:{ created_at : -1 }},
        {$project: {
            _id: 1, text : 1, created_at : 1,comments:1,user_id:1,
            numberOfLikes: { $cond: { if: { $isArray: "$likes" }, then: { $size: "$likes" }, else: 0} }
        }}
        ],
        function(err, posts){
        if (err) {
            return res.status(500).json({ message: 'Error en la petición' });
        }
        return res.json(posts);
    });
}

function likePost (req, res) {
    const postId = req.params.postId;
    const userId = req.body.userId;

    Post.findById(postId, (err, post) => {
        if (err) {
            return res.status(500).send({ message: 'Error en la peticion' });
        }
        if (!post) {
            return res.status(404).send({ message: 'Id no encontrado' });
        } else {
            if(post.likes.includes(userId)){
                return res.status(200).send({ message: 'Ya realizaste un like' });
            }
            else{
                Post.findByIdAndUpdate(postId,{ "$push": { "likes": userId} }, (err, post) => {
                    if (err) {
                        return res.status(500).send({ message: 'Error en la peticion' });
                    }
                    else{
                        return res.status(200).send({ message: 'Like realizado' });
                    }  
                });
            }
        }
    })
}

module.exports = {
    savePost,
    getPosts,
    getPostByUserId,
    likePost
}