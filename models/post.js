'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = Schema({
    user_id: {
        type: Schema.ObjectId, ref: 'User',
        required: [true, 'El objeto usuario es requerido'],
    },
    text: {
        type: String,
        required: [true, 'El texto de la publicacion es requerido'],
    },
    likes: [
        { 
            type: Schema.ObjectId, ref: 'User',
        }
    ],
    created_at: {
        type: String
    }
});

module.exports = mongoose.model('Post', PostSchema); //(nombre de la entidad,nombre del schema)